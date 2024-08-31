import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import ResourcesService from './resources.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import UploadFileRequest from './dto/UploadFileRequest';
import FilterResourceRequest from './dto/FilterResourceRequest';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('/resources')
export default class ResourcesController {
    constructor(@Inject() private readonly resourceService: ResourcesService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() payload: UploadFileRequest
    ) {
        this.resourceService.multiUpload(files, payload.names);

        return {
            statusCode: 200,
            message: `Your files are being processed! Please wait a bit!`
        };
    }

    @Get()
    @UseGuards(AuthGuard)
    async getResouces(@Query() params: FilterResourceRequest) {
        return {
            statusCode: 200,
            data: await this.resourceService.getResources(params)
        };
    }
}
