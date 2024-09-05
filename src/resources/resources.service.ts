import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { randomUUID } from 'crypto';
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/shared/PrismaClient';
import FilterResourceRequest from './dto/FilterResourceRequest';

@Injectable()
export default class ResourcesService {
    constructor(
        @InjectS3() private readonly s3: S3,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) {}

    async updateResource(id: string, fileName: string) {
        return this.prisma.resource.update({
            data: { name: fileName },
            where: { id }
        });
    }

    async getResources(params: FilterResourceRequest) {
        return this.prisma.resource.findMany({
            select: { id: true, created_at: true, name: true, url: true },
            where: {
                name: {
                    contains: params.name
                }
            },
            orderBy: params.sort,
            skip: params.page * params.size,
            take: params.size
        });
    }

    async multiUpload(files: Express.Multer.File[], names: string[]) {
        const allKeys = files.map(
            (f) => `${randomUUID()}-${f.originalname.replaceAll(' ', '')}`
        );
        try {
            return Promise.all(
                files.map((f, idx) => this.upload(f, allKeys[idx], names[idx]))
            );
        } catch (error) {
            console.error(error);
            // If any upload fails, delete all
            Promise.allSettled(allKeys.map((key) => this.delete(key)));
            this.deleteManyResource(allKeys);
            return null;
        }
    }

    async singleUpload(file: Express.Multer.File, fileName: string) {
        const key = `${randomUUID()}-${file.originalname.replaceAll(' ', '')}`;
        return this.upload(file, key, fileName);
    }

    private async upload(
        file: Express.Multer.File,
        key: string,
        fileName: string
    ) {
        const putCommand = new PutObjectCommand({
            Bucket: this.configService.get<string>('S3_BUCKET'),
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        });

        await this.s3.send(putCommand);
        await this.saveResourceToDb(key, fileName);
        return key;
    }

    private async delete(key: string) {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: this.configService.get<string>('S3_BUCKET'),
            Key: key,
            BypassGovernanceRetention: true
        });
        this.s3.send(deleteCommand);
    }

    private async deleteManyResource(s3Keys: string[]) {
        const bucket = this.configService.get<string>('S3_BUCKET');
        const region = this.configService.get<string>('S3_REGION');
        const urlFromKeys = s3Keys.map(
            (key) => `https://${bucket}.s3.${region}.amazonaws.com/${key}`
        );
        this.prisma.resource.deleteMany({
            where: {
                url: {
                    in: urlFromKeys
                }
            }
        });
    }

    private async saveResourceToDb(s3Key: string, fileName: string) {
        const bucket = this.configService.get<string>('S3_BUCKET');
        const region = this.configService.get<string>('S3_REGION');
        await this.prisma.resource.create({
            data: {
                name: fileName,
                url: `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`
            }
        });
    }
}
