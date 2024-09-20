import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';

@Injectable()
export default class VariantPictureRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(variant_id: string, data: string[]) {
        await this.prisma.variantDisplayPicture.deleteMany({
            where: {
                variant_id
            }
        });

        await this.prisma.variantDisplayPicture.createMany({
            data: data.map((resource_id) => ({
                variant_id,
                resource_id
            }))
        });
    }
}
