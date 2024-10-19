import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UpsertGenericMotorbikeDto } from './dto/UpsertGenericMotorbikeDto';
import { GenericMotorbikeService } from './generic_motorbikes.service';

@Controller('generic_motorbikes')
export class GenericMotorbikeController {
    constructor(private readonly genericMotorbikeService: GenericMotorbikeService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createGenericMotorbike(@Body() body: UpsertGenericMotorbikeDto) {
        this.genericMotorbikeService.create(body)
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async updateGenericMotorbike(@Body() body: UpsertGenericMotorbikeDto, @Param('id') id: number) {
        this.genericMotorbikeService.update(id, body)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteGenericMotorbike(@Param('id') id: number) {
        this.genericMotorbikeService.delete(id)
    }
}
