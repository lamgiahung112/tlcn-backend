import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ServiceTokensService {
    constructor(private readonly prisma: PrismaService) {}

    async markServiceTokenUsed(serviceTokenId: number) {
        await this.prisma.serviceToken.update({
            where: { id: serviceTokenId },
            data: { usedAt: new Date() }
        });
    }

    async checkAndDisableServiceTokens(motorbikeId: number) {
        const motorbike = await this.prisma.motorbike.findUnique({
            where: { id: motorbikeId }
        });

        const serviceTokens = await this.prisma.serviceToken.findMany({
            where: { motorbikeId }
        });

        serviceTokens.forEach(async (token) => {
            if (!token.isEligible) return;
            const exceedMaxOdo = token.maxOdometer < motorbike.odometer;
            const monthsFromSold = Math.floor(
                (new Date().getTime() - motorbike.soldAt.getTime()) /
                    (1000 * 60 * 60 * 24 * 30)
            );
            const isInRange = monthsFromSold <= token.maxMonth;
            if (exceedMaxOdo || !isInRange) {
                token.isEligible = false;
                await this.prisma.serviceToken.update({
                    where: { id: token.id },
                    data: token
                });
            }
        });
    }
}
