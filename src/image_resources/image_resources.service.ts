import { PrismaService } from '@/shared/PrismaClient';
import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import Multer from 'multer';
import { InjectS3, S3 } from 'nestjs-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageResourcesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        @InjectS3() private readonly s3: S3
    ) {}

    async create(file: Express.Multer.File) {
        const bucket = this.configService.get('S3_BUCKET');
        const s3Key = `uploads/${uuidv4()}-${file.originalname}`;

        const putCommand = new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: ObjectCannedACL.public_read
        });

        try {
            await this.s3.send(putCommand);

            const imageResource = await this.prisma.imageResource.create({
                data: {
                    filename: file.originalname,
                    s3Key: s3Key
                }
            });

            return imageResource;
        } catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async delete(id: number) {
        const imageResource = await this.prisma.imageResource.findUnique({
            where: { id }
        });

        if (!imageResource) {
            throw new NotFoundException(
                `Image resource with ID ${id} not found`
            );
        }

        const bucket = this.configService.get('S3_BUCKET');
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucket,
            Key: imageResource.s3Key
        });

        try {
            await this.s3.send(deleteCommand);
            await this.prisma.imageResource.delete({ where: { id } });
        } catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    async paginate(page: number = 1, perPage: number = 10, name?: string) {
        const skip = (page - 1) * perPage;

        const where: Prisma.ImageResourceWhereInput = name ? {
            filename: {
                contains: name,
                mode: 'insensitive' // This makes the search case-insensitive
            }
        } : {};

        const [items, total] = await Promise.all([
            this.prisma.imageResource.findMany({
                where,
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.imageResource.count({ where }),
        ]);

        const totalPages = Math.ceil(total / perPage);

        return {
            items,
            meta: {
                total,
                page,
                perPage,
                totalPages,
            },
        };
    }
}
