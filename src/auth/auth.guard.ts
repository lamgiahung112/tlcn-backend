import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const sessionId = this.extractFromHeader(request);

        return this.authService.validate(sessionId);
    }

    private extractFromHeader(request: Request): string | undefined {
        return request.headers['x-session-id'];
    }
}
