import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';

@Module({
    imports: [CacheModule.register()],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [CacheModule]
})
export class AuthModule {}
