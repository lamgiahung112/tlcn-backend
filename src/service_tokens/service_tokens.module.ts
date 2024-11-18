import { PrismaService } from '@/shared/PrismaClient';
import { Module } from '@nestjs/common';
import ServiceTokensService from './service_tokens.service';
import ServiceTokensController from './service_tokens.controller';

@Module({
    providers: [PrismaService, ServiceTokensService],
    controllers: [ServiceTokensController]
})
export default class ServiceTokensModule {
    constructor() {}
}
