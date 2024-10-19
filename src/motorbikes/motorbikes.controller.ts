import { Controller, HttpCode, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MotorbikeService } from './motorbikes.service';

@Controller('motorbikes')
export class MotorbikeController {
    constructor(
        private readonly motorbikeService: MotorbikeService
    ) {}

    @Post('import_from_csv')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    async importFromCsv(@Query('genericMotorbikeId') id: number, @UploadedFile() file: Express.Multer.File) {
        await this.motorbikeService.importMotorbikesFromCsv(id, file)
    }
}
