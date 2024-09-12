import { PrismaService } from '@/shared/PrismaClient';
import UpdateModelRequest from '../dto/UpdateModelRequest';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ModelRepository {
    constructor(private readonly prisma: PrismaService) {}

    insert(data: UpdateModelRequest) {
        return this.prisma.model.create({
            data,
            select: {
                id: true,
                name: true,
                description: true
            }
        });
    }

    update(id: string, data: UpdateModelRequest) {
        return this.prisma.model.update({
            where: {
                id
            },
            data,
            select: {
                id: true,
                name: true,
                description: true
            }
        });
    }

    getAll() {
        return this.prisma.model.findMany({
            select: {
                id: true,
                name: true,
                description: true
            }
        });
    }
}
