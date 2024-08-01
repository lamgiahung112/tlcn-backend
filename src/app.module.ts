import { Module } from '@nestjs/common';
import { MotorbikesModule } from './motorbikes/motorbikes.module';
import { AuthModule } from './auth/auth.module';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { MediaResourceModule } from '@/media-resource/media-resource.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        ),
        MotorbikesModule,
        AuthModule,
        MediaResourceModule
    ]
})
export class AppModule {}
