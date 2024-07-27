import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import { Between, In, Like, Repository } from 'typeorm';
import GetMotorbikeListDto from '@/motorbikes/dto/get-motorbike-list.dto';

@Injectable()
export class MotorbikesService {
    constructor(
        @InjectRepository(Motorbike)
        private readonly motorbikesRepository: Repository<Motorbike>
    ) {}

    find(params: GetMotorbikeListDto): Promise<Motorbike[]> {
        return this.motorbikesRepository.find({
            skip: params.page * params.size,
            take: params.size,
            where: {
                recommendedPrice: Between(params.minPrice, params.maxPrice),
                name: Like(params.name),
                variant: {
                    color: params.color ? In(params.color) : undefined
                },
                category: Like(params.category)
            },
            order: params.sort
        });
    }
}
