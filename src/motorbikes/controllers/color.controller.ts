import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from '@nestjs/common';
import ColorService from '../services/color.service';
import UpdateColorRequest from '../dto/UpdateColorRequest';

@Controller('colors')
export default class ColorController {
    constructor(private readonly colorService: ColorService) {}

    @Get()
    async getAll() {
        return this.colorService.getAll();
    }

    @Post()
    async create(@Body() data: UpdateColorRequest) {
        return this.colorService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateColorRequest) {
        return this.colorService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.colorService.delete(id);
    }
}
