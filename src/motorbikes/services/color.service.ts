import { HttpStatus, Injectable } from '@nestjs/common';
import ColorRepository from '../repositories/color.repository';
import UpdateColorRequest from '../dto/UpdateColorRequest';

@Injectable()
export default class ColorService {
    constructor(private readonly colorRepository: ColorRepository) {}

    async getAll() {
        try {
            const result = await this.colorRepository.findAll();
            return {
                statusCode: HttpStatus.OK,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to get colors, please try again',
                data: []
            };
        }
    }

    async create(data: UpdateColorRequest) {
        try {
            const result = await this.colorRepository.create(data);
            return {
                statusCode: HttpStatus.OK,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create color, please try again',
                data: []
            };
        }
    }

    async update(id: string, data: UpdateColorRequest) {
        try {
            const result = await this.colorRepository.update(id, data);
            return {
                statusCode: HttpStatus.OK,
                data: result
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update color, please try again'
            };
        }
    }

    async delete(id: string) {
        try {
            await this.colorRepository.delete(id);
            return {
                statusCode: HttpStatus.OK,
                message: 'Color deleted successfully'
            };
        } catch {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete color, please try again'
            };
        }
    }
}
