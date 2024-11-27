import { Module } from '@nestjs/common';
import { MotorbikeService } from './motorbikes.service';
import { MotorbikeController } from './motorbikes.controller';
import { PrismaService } from '@/shared/PrismaClient';
import { AuthService } from '@/auth/auth.service';
import { MailerService } from '@/notifications/mailer.service';

@Module({
    controllers: [MotorbikeController],
    providers: [MotorbikeService, PrismaService, AuthService, MailerService],
    exports: [MotorbikeService]
})
export class MotorbikeModule {}
