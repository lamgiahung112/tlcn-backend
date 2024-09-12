import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';

@Injectable()
export default class GalleryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(motorbike_id: string, data: string[]) {
        const oldPictures = await this.prisma.motorBikePictures.findMany({
            where: {
                motorbike_id
            }
        });

        const jobs = [] as PrismaPromise<any>[];

        const picturesToDelete = oldPictures.filter(
            (picture) => !data.includes(picture.resource_id)
        );
        const picturesToAdd = data.filter(
            (picture) => !oldPictures.some((p) => p.resource_id === picture)
        );

        jobs.push(
            this.prisma.motorBikePictures.deleteMany({
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
            this.prisma.motorBikePictures.createMany({
                data: picturesToAdd.map((picture) => ({
                    resource_id: picture,
                    motorbike_id
                }))
            })
        );

        await this.prisma.$transaction(jobs);
    }
}
