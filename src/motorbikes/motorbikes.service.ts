import { PrismaService } from "@/shared/PrismaClient";
import { Injectable, BadRequestException } from "@nestjs/common";
import * as csv from 'csv-parse';
import { Readable } from 'stream';

@Injectable()
export class MotorbikeService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async importMotorbikesFromCsv(genericMotorbikeId: number, file: Express.Multer.File) {
        const genericMotorbike = await this.prisma.genericMotorbike.findUnique({
            where: { id: genericMotorbikeId }
        });

        if (!genericMotorbike) {
            throw new BadRequestException(`Generic motorbike with ID ${genericMotorbikeId} not found`);
        }

        const results = await this.parseCsvFile(file.buffer);

        const createdMotorbikes = await this.prisma.motorbike.createMany({
            data: results.map(row => {
                return {
                    genericMotorbikeId,
                    price: Number(row.price),
                    chassisCode: row.chassisCode,
                    engineCode: row.engineCode,
                    arrivedToInventoryAt: new Date(row.arrivedToInventoryAt),
                }
            })
        });

        return {
            message: `Imported ${createdMotorbikes.count} motorbikes`,
            createdMotorbikes
        };
    }

    async setMotorbikeSold(motorbikeId: number) {
        await this.prisma.motorbike.update({
            where: {
                id: motorbikeId
            },
            data: {
                isSold: true
            }
        })
    }

    private parseCsvFile(fileBuffer: Buffer): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results = [];
            const stream = Readable.from(fileBuffer.toString());

            stream
                .pipe(csv.parse({
                    columns: true,
                    skip_empty_lines: true
                }))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
}
