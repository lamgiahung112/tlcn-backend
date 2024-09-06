import { PrismaService } from '@/shared/PrismaClient';
import { Prisma } from '@prisma/client';

export default class MotorbikeModelRepository {
    constructor(private readonly prisma: PrismaService) {}

    insert(data: Prisma.ModelCreateInput) {
        return this.prisma.model.create({
            data,
            select: {
                id: true,
                name: true
            }
        });
    }

    update(id: string, data: Prisma.ModelUpdateInput) {
        return this.prisma.model.update({
            data,
            where: {
                id
            }
        });
    }
}
