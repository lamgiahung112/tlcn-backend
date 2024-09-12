import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import UpdateMotorbikeRequest from '../dto/UpdateMotorbikeRequest';
import MotorbikeService from '../services/motorbike.service';

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
}
