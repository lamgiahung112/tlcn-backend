import { forwardRef, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { PrismaService } from '@/shared/PrismaClient';
import { NotificationsModule } from '@/notifications/notifications.module';

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        forwardRef(() => NotificationsModule)
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [CacheModule]
})
export class AuthModule {}
