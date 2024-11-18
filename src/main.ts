import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true
    });
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true
        })
    );
    await app.listen(process.env.PORT);
}
bootstrap();
