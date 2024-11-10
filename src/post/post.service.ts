import { PrismaService } from '@/shared/PrismaClient';
import { Prisma } from '@prisma/client';
import { PostRequestDto } from './dto/PostRequestDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async paginate(page: number, perPage: number, name?: string) {
        const where: Prisma.PostWhereInput = {
            isPublished: true
        };
        if (name) {
            where.title = {
                contains: name
            };
        }
        const total = await this.prisma.post.count({
            where
        });
        return {
            meta: {
                total,
                totalPages: Math.ceil(total / perPage)
            },
            items: await this.prisma.post.findMany({
                skip: (page - 1) * perPage,
                take: perPage,
                where,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    excerpt: true,
                    isPublished: true,
                    createdAt: true,
                    thumbnailResource: true,
                    updatedAt: true
                }
            })
        };
    }

    async adminPaginate(page: number, perPage: number, name?: string) {
        const where: Prisma.PostWhereInput = {};
        if (name) {
            where.title = {
                contains: name
            };
        }
        const total = await this.prisma.post.count({
            where
        });
        return {
            meta: {
                total,
                totalPages: Math.ceil(total / perPage)
            },
            items: await this.prisma.post.findMany({
                skip: (page - 1) * perPage,
                take: perPage,
                where,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    excerpt: true,
                    isPublished: true,
                    createdAt: true,
                    thumbnailResource: true,
                    updatedAt: true
                }
            })
        };
    }

    async getPost(id: number) {
        return this.prisma.post.findUnique({
            where: {
                id
            }
        });
    }

    async createPost(data: PostRequestDto) {
        return this.prisma.post.create({
            data: {
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                thumbnailResourceId: data.thumbnailResourceId
            }
        });
    }

    async updatePost(id: number, data: PostRequestDto) {
        return this.prisma.post.update({
            where: { id },
            data
        });
    }

    async deletePost(id: number) {
        return this.prisma.post.delete({
            where: { id }
        });
    }

    async publishPost(id: number) {
        return this.prisma.post.update({
            where: { id },
            data: { isPublished: true }
        });
    }

    async unpublishPost(id: number) {
        return this.prisma.post.update({
            where: { id },
            data: { isPublished: false }
        });
    }
}
