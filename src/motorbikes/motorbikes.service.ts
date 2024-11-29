import { PrismaService } from '@/shared/PrismaClient';
import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import * as csv from 'csv-parse';
import { Readable } from 'stream';

@Injectable()
export class MotorbikeService {
    constructor(private readonly prisma: PrismaService) {}

    async importMotorbikesFromCsv(
        genericMotorbikeId: number,
        file: Express.Multer.File
    ) {
        const genericMotorbike = await this.prisma.genericMotorbike.findUnique({
            where: { id: genericMotorbikeId }
        });

        if (!genericMotorbike) {
            throw new BadRequestException(
                `Generic motorbike with ID ${genericMotorbikeId} not found`
            );
        }

        const results = await this.parseCsvFile(file.buffer);

        const createdMotorbikes = await this.prisma.motorbike.createMany({
            data: results.map((row) => {
                return {
                    genericMotorbikeId,
                    price: genericMotorbike.recommendedPrice,
                    chassisCode: row.chassisCode,
                    engineCode: row.engineCode,
                    arrivedToInventoryAt: new Date(row.arrivedToInventoryAt),
                    plateNumber: row.plateNumber,
                };
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
        });
    }

    private parseCsvFile(fileBuffer: Buffer): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results = [];
            const stream = Readable.from(fileBuffer.toString());

            stream
                .pipe(
                    csv.parse({
                        columns: true,
                        skip_empty_lines: true
                    })
                )
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    async getMotorbikesByCustomerId(customerId: number) {
        const orders = await this.prisma.order.findMany({
            where: { customerId, status: OrderStatus.COMPLETED },
            include: {
                orderItems: {
                    select: {
                        motorbike: {
                            include: {
                                genericMotorbike: {
                                    include: {
                                        images: {
                                            select: {
                                                imageResource: {
                                                    select: {
                                                        s3Key: true
                                                    }
                                                }
                                            },
                                            where: {
                                                isGallery: false
                                            },
                                            take: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const motorbikes = [];
        orders.forEach((order) => {
            order.orderItems.forEach((item) => {
                motorbikes.push(item.motorbike);
            });
        });
        return motorbikes;
    }

    async getMotorbikeDetailId(motorbikeId: number) {
        return this.prisma.motorbike.findUnique({
            where: { id: motorbikeId },
            include: {
                genericMotorbike: {
                    include: {
                        images: {
                            select: {
                                imageResource: true
                            },
                            where: {
                                isGallery: false
                            }
                        }
                    }
                },
                serviceTokens: true
            }
        });
    }
}
