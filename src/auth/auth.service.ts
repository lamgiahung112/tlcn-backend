import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/shared/PrismaClient';
import { MailerService } from '@/notifications/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly mailerService: MailerService
    ) {}

    async login(username: string, password: string) {
        const validUsername =
            !!username &&
            username === this.configService.get<string>('ADMIN_USERNAME');
        const validPassword =
            !!password &&
            password === this.configService.get<string>('PASSWORD');
        if (!validUsername && !validPassword) {
            throw new UnauthorizedException();
        }

        const sessionId = crypto.randomUUID().replaceAll('-', '');
        await this.cacheManager.set(
            sessionId,
            sessionId,
            this.configService.get<number>('ADMIN_SESSION_EXP')
        );
        return sessionId;
    }

    async validate(sessionId: string) {
        if (!sessionId) {
            return false;
        }

        const isValidSession = await this.cacheManager.get(sessionId);
        if (!isValidSession) {
            return false;
        }

        await this.cacheManager.set(
            sessionId,
            sessionId,
            this.configService.get<number>('ADMIN_SESSION_EXP')
        );
        return true;
    }

    async register(registerDto: RegisterDto) {
        return this.prisma.user.create({
            data: registerDto
        });
    }

    async sendLoginLink(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw new BadRequestException();
        }
        const code = crypto.randomUUID().replaceAll('-', '');
        await this.cacheManager.set(email, code, 10 * 60 * 1000);
        const link = `http://localhost:5173/auth/login?email=${email}&code=${code}`;
        await this.mailerService.sendMail(email, 'Login Link', 'login_link', {
            link
        });
    }

    async verifyLoginLink(email: string, code: string) {
        const cachedCode = await this.cacheManager.get(email);
        if (!cachedCode || cachedCode !== code) {
            return false;
        }
        await this.cacheManager.del(email);
        const sessionId = crypto.randomUUID().replaceAll('-', '');
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return false;
        }
        await this.cacheManager.set(sessionId, user.id, 4 * 60 * 60 * 1000);
        return sessionId;
    }

    async validateUserSession(sessionId: string) {
        const userId: number = await this.cacheManager.get(sessionId);
        if (!userId) {
            return false;
        }
        return userId;
    }

    async getUser(sessionId: string) {
        const userId = await this.validateUserSession(sessionId);
        console.log('userId', userId);
        if (!userId) {
            return false;
        }
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
}
