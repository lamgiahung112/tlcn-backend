import { HttpStatus, Injectable } from '@nestjs/common';
import ModelRepository from '../repositories/model.repository';
import UpdateModelRequest from '../dto/UpdateModelRequest';

@Injectable()
export default class ModelService {
    constructor(private readonly modelRepository: ModelRepository) {}

    async create(data: UpdateModelRequest) {
        try {
            const result = await this.modelRepository.insert(data);
            return {
                statusCode: HttpStatus.CREATED,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create model, please try again'
            };
        }
    }

    async update(id: string, data: UpdateModelRequest) {
        try {
            const result = await this.modelRepository.update(id, data);
            return {
                statusCode: HttpStatus.OK,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update model, please try again'
            };
        }
    }

    async getAll() {
        try {
            const result = await this.modelRepository.getAll();
            return {
                statusCode: HttpStatus.OK,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to get models, please try again'
            };
        }
    }
}
