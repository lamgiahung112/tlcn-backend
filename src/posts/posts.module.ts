import { PrismaService } from '@/shared/PrismaClient';
import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
    providers: [PrismaService, PostsService],
    controllers: [PostsController]
})
export default class PostsModule {}
