import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import CreatePostRequest from './dto/CreatePostRequest';
import EditPostRequest from './dto/EditPostRequest';

@Injectable()
export default class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    async createPost(data: CreatePostRequest) {
        const post = await this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                thumbnail_resource_id: data.thumbnail_resource_id,
                created_at: new Date(),
                modified_at: new Date()
            }
        });

        return post;
    }

    async editPost(data: EditPostRequest) {
        return await this.prisma.post
            .update({
                where: {
                    id: data.id
                },
                data: {
                    title: data.title,
                    content: data.content,
                    thumbnail_resource_id: data.thumbnail_resource_id
                }
            })
            .then(() => true)
            .catch(() => false);
    }
}
