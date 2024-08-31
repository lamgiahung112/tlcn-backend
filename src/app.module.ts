import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ResourcesModule from './resources/resources.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        ResourcesModule
    ]
})
export class AppModule {}
