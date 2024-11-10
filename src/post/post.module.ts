import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '@/shared/PrismaClient';

@Module({
    controllers: [PostController],
    imports: [],
    providers: [PostService, PrismaService],
    exports: [PostService]
})
export class PostModule {}
