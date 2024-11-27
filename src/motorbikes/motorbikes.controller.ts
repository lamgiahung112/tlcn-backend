import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    UnauthorizedException,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MotorbikeService } from './motorbikes.service';
import { Request } from 'express';
import { AuthService } from '@/auth/auth.service';

@Controller('motorbikes')
export class MotorbikeController {
    constructor(
        private readonly motorbikeService: MotorbikeService,
        private readonly authService: AuthService
    ) {}

    @Post('import_from_csv')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    async importFromCsv(
        @Query('genericMotorbikeId') id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        await this.motorbikeService.importMotorbikesFromCsv(id, file);
    }

    @Get('user')
    async getUserMotorbikes(@Req() request: Request) {
        const token = request.cookies?.['user_token'];
        const customerId = await this.authService.validateUserSession(token);
        if (!customerId) {
            throw new UnauthorizedException();
        }
        return this.motorbikeService.getMotorbikesByCustomerId(customerId);
    }

    @Get(':id')
    async getMotorbikeDetail(@Param('id') id: number) {
        return this.motorbikeService.getMotorbikeDetailId(id);
    }
}
