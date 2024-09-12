import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from '@nestjs/common';
import ModelService from '../services/model.service';
import UpdateModelRequest from '../dto/UpdateModelRequest';

@Controller('models')
export default class ModelController {
    constructor(private readonly modelService: ModelService) {}

    @Post()
    async create(@Body() data: UpdateModelRequest) {
        return this.modelService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateModelRequest) {
        return this.modelService.update(id, data);
    }

    @Get()
    async getAll() {
        return this.modelService.getAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.modelService.delete(id);
    }
}
