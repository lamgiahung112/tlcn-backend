import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SchedulerService } from './scheduler.service';
import { PrismaService } from '@/shared/PrismaClient';

@Module({
    providers: [MailerService, SchedulerService, PrismaService],
    exports: [MailerService]
})
export class NotificationsModule {}
