import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '@/shared/PrismaClient';
import { MailerService } from '@/notifications/mailer.service';

@Module({
    controllers: [PostController],
    imports: [],
    providers: [PostService, PrismaService, MailerService],
    exports: [PostService]
})
export class PostModule {}
