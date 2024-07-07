import { Injectable } from '@nestjs/common';
import { CreateMotorbikeDto } from './dto/create-motorbike.dto';
import { UpdateMotorbikeDto } from './dto/update-motorbike.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class MotorbikesService {
    constructor(
        @InjectRepository(Motorbike)
        private readonly motorbikesRepository: Repository<Motorbike>
    ) {}

    async create(createMotorbikeDto: CreateMotorbikeDto) {
        return this.motorbikesRepository.save(createMotorbikeDto);
    }

    findAll() {
        return this.motorbikesRepository.find();
    }

    findOne(id: string) {
        return this.motorbikesRepository.findOneById(id);
    }

    update(id: number, updateMotorbikeDto: UpdateMotorbikeDto) {
        return `This action updates a #${id} motorbike`;
    }

    remove(id: string) {
        return this.motorbikesRepository.delete(
            ObjectId.createFromHexString(id)
        );
    }
}
