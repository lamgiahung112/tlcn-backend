import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/PrismaClient';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import ResourcesService from '@/resources/resources.service';
import ResourcesModule from '@/resources/resources.module';
import ModelRepository from './repositories/model.repository';
import ModelService from './services/model.service';
import ModelController from './controllers/model.controller';

@Module({
    imports: [AuthModule, ResourcesModule],
    controllers: [ModelController],
    providers: [
        PrismaService,
        AuthService,
        ResourcesService,
        ModelRepository,
        ModelService
    ]
})
export default class MotorbikeModule {}
