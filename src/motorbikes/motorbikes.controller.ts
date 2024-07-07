import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { MotorbikesService } from './motorbikes.service';
import { CreateMotorbikeDto } from './dto/create-motorbike.dto';
import { UpdateMotorbikeDto } from './dto/update-motorbike.dto';

@Controller('motorbikes')
export class MotorbikesController {
    constructor(private readonly motorbikesService: MotorbikesService) {}

    @Post()
    create(@Body() createMotorbikeDto: CreateMotorbikeDto) {
        return this.motorbikesService.create(createMotorbikeDto);
    }

    @Get()
    All() {
        return this.motorbikesService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.motorbikesService.findOne(id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: string,
        @Body() updateMotorbikeDto: UpdateMotorbikeDto
    ) {
        return this.motorbikesService.update(+id, updateMotorbikeDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.motorbikesService.remove(id);
    }
}
