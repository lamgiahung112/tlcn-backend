import { Module } from '@nestjs/common';
import { MotorbikesModule } from './motorbikes/motorbikes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import { AuthModule } from './auth/auth.module';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Motorbike],
            useUnifiedTopology: true,
            useNewUrlParser: true
        }),
        MotorbikesModule,
        AuthModule
    ]
})
export class AppModule {}
