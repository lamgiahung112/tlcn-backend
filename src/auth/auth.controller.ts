import {
    Body,
    Controller,
    Get,
    Headers,
    Post,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        const sessionId = await this.authService.login(
            loginDto.username,
            loginDto.password
        );
        return {
            sessionId
        };
    }

    @Get()
    async validateSession(@Headers('x-session-id') sessionId: string) {
        if (!sessionId) {
            throw new UnauthorizedException();
        }
        await this.authService.validate(sessionId);
        return {
            isAuthenticated: true
        };
    }
}
