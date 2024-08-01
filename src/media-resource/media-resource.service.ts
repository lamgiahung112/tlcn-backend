import { BadRequestException, Injectable } from '@nestjs/common';
import { MediaResource } from '@/media-resource/entities/media-resource';
import { UploadMediaResouceDto } from '@/media-resource/dto/upload-media-resouce.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as path from 'node:path';
import * as fs from 'node:fs';
import 'multer';
import { GetMediaResourceListDto } from '@/media-resource/dto/get-media-resource-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MediaResourceService {
    constructor(
        @InjectModel(MediaResource.name)
        private mediaResourceModel: Model<MediaResource>
    ) {}

    async saveImageResource(
        payload: UploadMediaResouceDto,
        file: Express.Multer.File
    ) {
        const ext = file.originalname.split('.')[1];
        const resource = new MediaResource();
        resource.type = 'IMAGE';
        resource.name = payload.name;
        resource.path = `${randomStringGenerator()}.${ext}`;

        return new Promise((resolve, reject) => {
            const appDir = path.dirname(require.main.filename);
            fs.writeFile(
                path.join(appDir, '../', '/media', resource.path),
                file.buffer,
                async (err) => {
                    if (err) {
                        reject(err);
                    }
                    await this.mediaResourceModel.create(resource);
                    resolve(null);
                }
            );
        });
    }

    async saveVideoResource(payload: UploadMediaResouceDto) {
        if (
            !payload.path ||
            typeof payload.path !== 'string' ||
            !payload.path.trim()
        ) {
            throw new BadRequestException("Can't save video resource");
        }
        await this.mediaResourceModel.create(payload);
    }

    async getMediaResourceList(params: GetMediaResourceListDto) {
        return this.mediaResourceModel
            .find({
                name: {
                    $regex: new RegExp(params.name, 'i')
                }
            })
            .skip(params.page * params.size)
            .limit(params.size)
            .sort(params.sort);
    }

    getImageReadStream(filename: string) {
        const appDir = path.dirname(require.main.filename);
        return fs.createReadStream(
            path.join(appDir, '../', '/media', filename)
        );
    }
}
