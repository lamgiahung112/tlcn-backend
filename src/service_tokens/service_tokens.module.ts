import { PrismaService } from '@/shared/PrismaClient';
import { Module } from '@nestjs/common';
import ServiceTokensService from './service_tokens.service';
import ServiceTokensController from './service_tokens.controller';
import { MotorbikeModule } from '@/motorbikes/motorbikes.module';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import { MailerService } from '@/notifications/mailer.service';

@Module({
    providers: [
        PrismaService,
        ServiceTokensService,
        PrismaService,
        AuthService,
        MailerService
    ],
    controllers: [ServiceTokensController],
    imports: [MotorbikeModule]
})
export default class ServiceTokensModule {
    constructor() {}
}
