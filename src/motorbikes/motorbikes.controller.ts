import { Controller, Get, Param} from '@nestjs/common';
import { MotorbikesService } from './motorbikes.service';
import GetMotorbikeListDto from '@/motorbikes/dto/get-motorbike-list.dto';

@Controller('motorbikes')
export class MotorbikesController {
    constructor(private readonly motorbikesService: MotorbikesService) {}

    @Get()
    async getMotorbikes(@Param() params: GetMotorbikeListDto) {
        return await this.motorbikesService.find(params);
    }
}
