import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { UpdateMotorbikeVariantRequest } from '../dto/UpdateMotorbikeRequest';
import VariantPictureRepository from './variant_picture.repository';
import { PrismaPromise } from '@prisma/client';

@Injectable()
export default class VariantRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly variantPictureRepository: VariantPictureRepository
    ) {}

    async update(motorbike_id: string, data: UpdateMotorbikeVariantRequest[]) {
        await this.prisma.motorbikeVariant.deleteMany({
            where: {
                motorbike_id
            }
        });

        return data.map(async (variant, idx) => {
            return this.prisma.motorbikeVariant
                .create({
                    data: {
                        color_id: variant.color_id,
                        motorbike_id
                    },
                    select: {
                        id: true
                    }
                })
                .then((variant) => {
                    return this.variantPictureRepository.update(
                        variant.id,
                        data[idx].displayPictures
                    );
                });
        });
    }
}
