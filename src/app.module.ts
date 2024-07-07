import { Module } from '@nestjs/common';
import { MotorbikesModule } from './motorbikes/motorbikes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import * as process from 'node:process';

@Module({
    imports: [
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
        MotorbikesModule
    ]
})
export class AppModule {}
