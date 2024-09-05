import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/PrismaClient';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import ResourcesService from '@/resources/resources.service';
import ResourcesModule from '@/resources/resources.module';

@Module({
    imports: [AuthModule, ResourcesModule],
    providers: [PrismaService, AuthService, ResourcesService]
})
export default class MotorbikeModule {}
