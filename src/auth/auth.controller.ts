import {
    Body,
    Controller,
    Get,
    Headers,
    Post,
    Req,
    Response,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response as ExpressResponse } from 'express';

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
            return {
                isAuthenticated: false
            };
        }

        return {
            isAuthenticated: await this.authService.validate(sessionId)
        };
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('send-login-link')
    async sendLoginLink(@Body() body: { email: string }) {
        return this.authService.sendLoginLink(body.email);
    }

    @Post('verify-login-link')
    async verifyLoginLink(
        @Response() response: ExpressResponse,
        @Body() body: { email: string; code: string }
    ) {
        const sessionId = await this.authService.verifyLoginLink(
            body.email,
            body.code
        );
        if (!sessionId) {
            throw new UnauthorizedException();
        }
        response.cookie('user_token', sessionId, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
        response.send(sessionId).end();
    }

    @Get('user')
    async getUser(@Req() request: Request) {
        const sessionId = request.cookies?.['user_token'];
        return this.authService.getUser(sessionId);
    }
}
