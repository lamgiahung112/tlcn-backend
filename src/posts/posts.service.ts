import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import CreatePostRequest from './dto/CreatePostRequest';
import EditPostRequest from './dto/EditPostRequest';
import { Prisma } from '@prisma/client';

@Injectable()
export default class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    private readonly postSelect: Prisma.PostSelect = {
        created_at: true,
        id: true,
        modified_at: true,
        thumbnail: true,
        title: true,
        views: true
    };

    private readonly postFullSelect: Prisma.PostSelect = {
        ...this.postSelect,
        content: true,
        thumbnail_resource_id: true
    };

    async createPost(data: CreatePostRequest) {
        const post = await this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                thumbnail_resource_id: data.thumbnail_resource_id,
                created_at: new Date(),
                modified_at: new Date()
            },
            select: this.postFullSelect
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
                    thumbnail_resource_id: data.thumbnail_resource_id,
                    modified_at: new Date()
                }
            })
            .then(() => true)
            .catch(() => false);
    }

    async getPostDetail(id: string) {
        return await this.prisma.post.findUnique({
            where: {
                id: id
            },
            select: this.postFullSelect
        });
    }

    async getPostList() {
        return await this.prisma.post.findMany({
            select: this.postSelect
        });
    }
}
