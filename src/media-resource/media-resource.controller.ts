import {
    Controller,
    Post,
    Body,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    Get,
    Param,
    Res
} from '@nestjs/common';
import { MediaResourceService } from './media-resource.service';
import { UploadMediaResouceDto } from './dto/upload-media-resouce.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetMediaResourceListDto } from '@/media-resource/dto/get-media-resource-list.dto';
import { Response } from 'express';

@Controller('media-resource')
export class MediaResourceController {
    constructor(private readonly mediaResourceService: MediaResourceService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createFileStorageDto: UploadMediaResouceDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        if (createFileStorageDto.type == 'VIDEO') {
            await this.mediaResourceService.saveVideoResource(
                createFileStorageDto
            );
            return {
                message: 'Saved media resource successfully!',
                status: HttpStatus.CREATED
            };
        }

        if (!file || !file.size) {
            throw new BadRequestException('Invalid file!');
        }

        await this.mediaResourceService.saveImageResource(
            createFileStorageDto,
            file
        );
        return {
            message: 'Saved media resource successfully!',
            status: HttpStatus.CREATED
        };
    }

    @Get()
    async getMediaResourceList(@Param() params: GetMediaResourceListDto) {
        return await this.mediaResourceService.getMediaResourceList(params);
    }

    @Get(':filename')
    async getImageResource(
        @Param('filename') filename: string,
        @Res() res: Response
    ) {
        this.mediaResourceService.getImageReadStream(filename).pipe(res);
    }
}
