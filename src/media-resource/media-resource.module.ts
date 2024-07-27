import { Module } from '@nestjs/common';
import { MediaResourceService } from './media-resource.service';
import { MediaResourceController } from './media-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaResource } from '@/media-resource/entities/media-resource';

@Module({
    controllers: [MediaResourceController],
    imports: [TypeOrmModule.forFeature([MediaResource])],
    providers: [MediaResourceService]
})
export class MediaResourceModule {}
