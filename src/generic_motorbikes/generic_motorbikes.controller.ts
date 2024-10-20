import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UpsertGenericMotorbikeDto } from './dto/UpsertGenericMotorbikeDto';
import { GenericMotorbikeService } from './generic_motorbikes.service';
import { FilterGenericMotorbikeDto } from './dto/FilterGenericMotorbikeDto';

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

    @Get()
    @HttpCode(HttpStatus.OK)
    async filter(@Query() queries: FilterGenericMotorbikeDto) {
        return this.genericMotorbikeService.paginate(
            queries.page,
            queries.perPage,
            queries.name,
            queries.category,
            queries.minPrice ?? 0,
            queries.maxPrice ?? 32767
        )
    }
}
