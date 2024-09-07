import { PrismaService } from '@/shared/PrismaClient';
import { Module } from '@nestjs/common';

@Module({
    providers: [PrismaService]
})
export default class PostsModule {}
