import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly configService: ConfigService
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
            throw new UnauthorizedException();
        }

        const isValidSession = await this.cacheManager.get(sessionId);
        if (!isValidSession) {
            throw new UnauthorizedException();
        }

        await this.cacheManager.set(
            sessionId,
            sessionId,
            this.configService.get<number>('ADMIN_SESSION_EXP')
        );
        return true;
    }
}
