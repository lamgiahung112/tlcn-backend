import { Module } from '@nestjs/common';
import { MediaResourceService } from './media-resource.service';
import { MediaResourceController } from './media-resource.controller';
import {
    MediaResource,
    MediaResourceSchema
} from '@/media-resource/entities/media-resource';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [MediaResourceController],
    imports: [
        MongooseModule.forFeature([
            {
                name: MediaResource.name,
                schema: MediaResourceSchema
            }
        ])
    ],
    providers: [MediaResourceService]
})
export class MediaResourceModule {}
