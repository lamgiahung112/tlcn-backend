import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import UpdateMotorbikeRequest from '../dto/UpdateMotorbikeRequest';
import MotorbikeService from '../services/motorbike.service';
import FilterMotorbikeRequest from '../dto/FilterMotorbikeRequest';

@Controller('motorbikes')
export default class MotorbikeController {
    constructor(private readonly motorbikeService: MotorbikeService) {}

    @Post()
    async create(@Body() data: UpdateMotorbikeRequest) {
        return this.motorbikeService.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: UpdateMotorbikeRequest
    ) {
        return this.motorbikeService.update(id, data);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.motorbikeService.getById(id);
    }

    @Get()
    async getList(@Query() filter: FilterMotorbikeRequest) {
        return this.motorbikeService.getList(filter);
    }
}
