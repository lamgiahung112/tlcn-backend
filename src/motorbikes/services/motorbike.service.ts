import { HttpStatus, Injectable } from '@nestjs/common';
import FilterMotorbikeRequest from '../dto/FilterMotorbikeRequest';
import UpdateMotorbikeRequest from '../dto/UpdateMotorbikeRequest';
import MotorbikeRepository from '../repositories/motorbike.repository';

@Injectable()
export default class MotorbikeService {
    constructor(private readonly motorbikeRepository: MotorbikeRepository) {}

    async create(data: UpdateMotorbikeRequest) {
        try {
            const result = await this.motorbikeRepository.create(data);
            return {
                data: result,
                message: 'Create motorbike successfully'
            };
        } catch (error) {
            return {
                data: null,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Create motorbike failed'
            };
        }
    }

    async update(id: string, data: UpdateMotorbikeRequest) {
        try {
            const result = await this.motorbikeRepository.update(id, data);
            return {
                data: result,
                message: 'Update motorbike successfully'
            };
        } catch (error) {
            return {
                data: null,
                message: 'Update motorbike failed'
            };
        }
    }

    async getList(filter: FilterMotorbikeRequest) {
        try {
            const data = await this.motorbikeRepository.getList(filter);
            return {
                data,
                message: 'Get list motorbike successfully'
            };
        } catch (error) {
            return {
                data: [],
                message: 'Get list motorbike failed'
            };
        }
    }

    async getById(id: string) {
        try {
            const data = await this.motorbikeRepository.getById(id);
            return {
                data,
                message: 'Get motorbike by id successfully'
            };
        } catch (error) {
            return {
                data: null,
                message: 'Get motorbike by id failed'
            };
        }
    }
}
