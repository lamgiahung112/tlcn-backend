import { Module } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';

@Module({
    exports: [AuthGuard, AuthModule]
})
export class AuthModule {}
