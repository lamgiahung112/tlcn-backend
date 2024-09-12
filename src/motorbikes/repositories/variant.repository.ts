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
        const oldVariants = await this.prisma.motorbikeVariant.findMany({
            where: {
                motorbike_id: motorbike_id
            }
        });

        const jobs: PrismaPromise<any>[] = [];

        const variantsToDelete = oldVariants.filter(
            (variant) => !data.some((v) => v.id === variant.id)
        );
        const variantsToAdd = data.filter(
            (variant) => !oldVariants.some((v) => v.id === variant.id)
        );
        const variantsToUpdate = data.filter((variant) =>
            oldVariants.some((v) => v.id === variant.id)
        );

        jobs.push(
            this.prisma.motorbikeVariant.deleteMany({
                where: {
                    id: {
                        in: variantsToDelete.map((variant) => variant.id)
                    }
                }
            })
        );

        jobs.push(
            this.prisma.motorbikeVariant.createMany({
                data: variantsToAdd.map((variant) => ({
                    motorbike_id,
                    ...variant
                }))
            })
        );

        jobs.push(
            this.prisma.motorbikeVariant.updateMany({
                where: {
                    id: {
                        in: variantsToUpdate.map((variant) => variant.id)
                    }
                },
                data: variantsToUpdate
            })
        );
        // Update variants
        await this.prisma.$transaction(jobs);

        const variantsAfterUpdate = await this.prisma.motorbikeVariant.findMany(
            {
                where: {
                    motorbike_id: motorbike_id
                }
            }
        );

        // Update variant pictures
        await Promise.all(
            variantsAfterUpdate.map((variant) =>
                this.variantPictureRepository.update(
                    variant.id,
                    data.find((v) => v.id === variant.id)?.displayPictures || []
                )
            )
        );
    }
}
