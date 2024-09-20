import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';

@Injectable()
export default class GalleryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(motorbike_id: string, data: string[]) {
        await this.prisma.motorBikePictures.deleteMany({
            where: {
                motorbike_id
            }
        });

        await this.prisma.motorBikePictures.createMany({
            data: data.map((picture) => ({
                resource_id: picture,
                motorbike_id
            }))
        });
    }
}
