import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { UpdateMotorbikeDetailRequest } from '../dto/UpdateMotorbikeRequest';

@Injectable()
export default class MotorbikeDetailRepository {
    constructor(private readonly prisma: PrismaService) {}

    update(motorbike_id: string, data: UpdateMotorbikeDetailRequest[]) {
        return this.prisma.motorbikeDetails.updateMany({
            where: {
                motorbike_id
            },
            data
        });
    }
}
