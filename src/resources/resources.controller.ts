import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import ResourcesService from './resources.service';
import { FileInterceptor } from '@nestjs/platform-express';
import UploadFileRequest from './dto/UploadFileRequest';
import FilterResourceRequest from './dto/FilterResourceRequest';
import { AuthGuard } from '@/auth/auth.guard';
import UpdateResourceRequest from './dto/UpdateResourceRequest';

@Controller('/resources')
export default class ResourcesController {
    constructor(@Inject() private readonly resourceService: ResourcesService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() files: Express.Multer.File,
        @Body() payload: UploadFileRequest
    ) {
        this.resourceService.singleUpload(files, payload.name);

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

    @Post('/:id')
    @UseGuards(AuthGuard)
    async updateResource(
        @Param('id') resourceId: string,
        @Body() payload: UpdateResourceRequest
    ) {
        return {
            statusCode: 200,
            data: await this.resourceService.updateResource(
                resourceId,
                payload.fileName
            )
        };
    }
}
