import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { UpdateMotorbikeDetailRequest } from '../dto/UpdateMotorbikeRequest';

@Injectable()
export default class MotorbikeDetailRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(motorbike_id: string, data: UpdateMotorbikeDetailRequest[]) {
        await this.prisma.motorbikeDetails.deleteMany({
            where: {
                motorbike_id
            }
        });

        await this.prisma.motorbikeDetails.createMany({
            data: data.map((detail) => ({
                motorbike_id,
                title: detail.title,
                detail: detail.detail,
                resource_id: detail.resource_id
            }))
        });
    }
}
