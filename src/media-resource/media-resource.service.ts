import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaResource } from '@/media-resource/entities/media-resource';
import { Repository } from 'typeorm';
import { UploadMediaResouceDto } from '@/media-resource/dto/upload-media-resouce.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as path from 'node:path';
import * as fs from 'node:fs';
import 'multer';
import { GetMediaResourceListDto } from '@/media-resource/dto/get-media-resource-list.dto';

@Injectable()
export class MediaResourceService {
    constructor(
        @InjectRepository(MediaResource)
        private readonly mediaResourceRepository: Repository<MediaResource>
    ) {}

    async saveImageResource(
        payload: UploadMediaResouceDto,
        file: Express.Multer.File
    ) {
        const ext = file.originalname.split('.')[1];
        const resource = new MediaResource();
        resource.created_at = new Date();
        resource.type = 'IMAGE';
        resource.name = payload.name;
        resource.path = `${randomStringGenerator()}.${ext}`;

        return new Promise((resolve) => {
            fs.writeFile(
                path.resolve(__dirname + '/' + resource.path),
                file.buffer,
                async (err) => {
                    if (err) {
                        throw new BadRequestException(err);
                    }
                    await this.mediaResourceRepository.save(resource);
                    resolve(null);
                }
            );
        });
    }

    async saveVideoResource(payload: UploadMediaResouceDto) {
        const resource = new MediaResource();
        resource.created_at = new Date();
        resource.type = 'VIDEO';
        resource.path = payload.path;
        resource.name = payload.name;
        await this.mediaResourceRepository.save(resource);
    }

    async getMediaResourceList(params: GetMediaResourceListDto) {
        return await this.mediaResourceRepository.find({
            skip: params.page * params.size,
            take: params.size,
            order: params.sort
        });
    }

    getImageReadStream(filename: string) {
        return fs.createReadStream(path.resolve(__dirname + '/' + filename), {
            autoClose: true
        });
    }
}
