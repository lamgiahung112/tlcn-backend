import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import ResourcesService from './resources.service';
import { PrismaService } from '@/shared/PrismaClient';
import ResourcesController from './resources.controller';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';

@Module({
    imports: [
        S3Module.forRootAsync({
            useFactory() {
                return {
                    config: {
                        credentials: {
                            accessKeyId: process.env.S3_ACCESS_KEY_ID,
                            secretAccessKey: process.env.S3_ACCESS_KEY_SECRET
                        },
                        region: process.env.S3_REGION,
                        forcePathStyle: true
                    }
                };
            }
        }),
        AuthModule
    ],
    providers: [ResourcesService, PrismaService, AuthService],
    controllers: [ResourcesController],
    exports: [ResourcesService]
})
export default class ResourcesModule {}
