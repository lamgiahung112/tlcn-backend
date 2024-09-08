import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ResourcesModule from './resources/resources.module';
import MotorbikeModule from './motorbikes/motorbikes.module';
import PostsModule from './posts/posts.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        ResourcesModule,
        MotorbikeModule,
        PostsModule
    ]
})
export class AppModule {}
