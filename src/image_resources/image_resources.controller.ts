import {
    Controller,
    Post,
    Delete,
    Get,
    Param,
    Query,
    UseInterceptors,
    UploadedFile,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ImageResourcesService } from './image_resources.service';
  
@Controller('image_resources')
export class ImageResourcesController {
    constructor(private readonly imageResourcesService: ImageResourcesService) {}

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.imageResourcesService.create(file);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteImage(@Param('id', ParseIntPipe) id: number) {
        await this.imageResourcesService.delete(id);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getImages(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('perPage', ParseIntPipe) perPage: number = 10,
        @Query('name') name?: string
    ) {
        return this.imageResourcesService.paginate(page, perPage, name);
    }
}