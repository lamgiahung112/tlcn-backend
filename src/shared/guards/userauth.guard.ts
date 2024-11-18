import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const sessionId = this.extractFromCookie(request);

        const userId = await this.authService.validateUserSession(sessionId);
        if (!userId) {
            return false;
        }
        request.user = userId;
        return true;
    }

    private extractFromCookie(request: Request): string | undefined {
        return request.cookies?.['user_token'];
    }
}
