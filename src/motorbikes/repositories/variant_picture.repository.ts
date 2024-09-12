import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';

@Injectable()
export default class VariantPictureRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(variant_id: string, data: string[]) {
        const oldPictures = await this.prisma.variantDisplayPicture.findMany({
            where: {
                variant_id
            }
        });
        const jobs: PrismaPromise<any>[] = [];
        const picturesToDelete = oldPictures.filter(
            (picture) => !data.includes(picture.resource_id)
        );
        const picturesToAdd = data.filter(
            (resource_id) =>
                !oldPictures.some(
                    (picture) => picture.resource_id === resource_id
                )
        );

        jobs.push(
            this.prisma.variantDisplayPicture.deleteMany({
                where: {
                    resource_id: {
                        in: picturesToDelete.map(
                            (picture) => picture.resource_id
                        )
                    }
                }
            })
        );

        jobs.push(
            this.prisma.variantDisplayPicture.createMany({
                data: picturesToAdd.map((resource_id) => ({
                    variant_id,
                    resource_id
                }))
            })
        );

        await this.prisma.$transaction(jobs);
    }
}
