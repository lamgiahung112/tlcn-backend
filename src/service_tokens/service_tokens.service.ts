import { MotorbikeService } from '@/motorbikes/motorbikes.service';
import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export default class ServiceTokensService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly motorbikesService: MotorbikeService
    ) {}

    async markServiceTokenUsed(serviceTokenId: number) {
        await this.prisma.serviceToken.update({
            where: { id: serviceTokenId },
            data: { usedAt: new Date(), isEligible: false }
        });
    }

    async getUserServiceHistory(
        page: number,
        perPage: number,
        customerId: number
    ) {
        const motorbikes =
            await this.motorbikesService.getMotorbikesByCustomerId(customerId);
        const total = await this.prisma.serviceToken.count({
            where: {
                motorbikeId: {
                    in: motorbikes.map((motorbike) => motorbike.id)
                },
                usedAt: {
                    not: null
                }
            }
        });
        const serviceTokens = await this.prisma.serviceToken.findMany({
            where: {
                motorbikeId: {
                    in: motorbikes.map((motorbike) => motorbike.id)
                },
                usedAt: {
                    not: null
                }
            },
            include: {
                motorbike: true
            },
            skip: (page - 1) * perPage,
            take: perPage
        });
        return {
            items: serviceTokens,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage)
            }
        };
    }

    async adminGetServiceTokens(
        page: number,
        perPage: number,
        plateNumber?: string,
        status?: 'USED' | 'UNUSED'
    ) {
        const where: Prisma.ServiceTokenWhereInput = {};
        if (plateNumber) {
            where.motorbike = {
                plateNumber
            };
        }
        if (status === 'USED') {
            where.isEligible = false;
            where.usedAt = {
                not: null
            };
        }
        if (status === 'UNUSED') {
            where.isEligible = true;
            where.usedAt = {
                equals: null
            };
        }
        const total = await this.prisma.serviceToken.count({
            where
        });
        const serviceTokens = await this.prisma.serviceToken.findMany({
            where,
            include: {
                motorbike: true
            },
            skip: (page - 1) * perPage,
            take: perPage
        });
        return {
            items: serviceTokens,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage)
            }
        };
    }
}
