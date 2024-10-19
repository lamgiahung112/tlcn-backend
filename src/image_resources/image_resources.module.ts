import { Module } from '@nestjs/common';
import { ImageResourcesController } from './image_resources.controller';
import { ImageResourcesService } from './image_resources.service';
import { S3Module } from 'nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '@/shared/PrismaClient';

@Module({
    controllers: [ImageResourcesController],
    providers: [ImageResourcesService, PrismaService],
    imports: [
        ConfigModule.forRoot(),
        S3Module.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                config: {
                    region: configService.get('S3_REGION'),
                    credentials: {
                        accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
                        secretAccessKey: configService.get('S3_ACCESS_KEY_SECRET'),
                    },
                    bucket: configService.get('S3_BUCKET')
                },
            }),
            inject: [ConfigService]
        })
    ],
    exports: [ImageResourcesService]
})
export class ImageResourcesModule {}
