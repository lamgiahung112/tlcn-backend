import { PrismaService } from "@/shared/PrismaClient";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpsertGenericMotorbikeDto } from "./dto/UpsertGenericMotorbikeDto";
import { Category, Prisma } from "@prisma/client";

@Injectable()
export class GenericMotorbikeService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(params: UpsertGenericMotorbikeDto) {
        const gMotorbike = await this.prisma.genericMotorbike.create({
            data: {
                category: params.category,
                model: params.model,
                name: params.name,
                recommendedPrice: params.recommendedPrice,
                description: params.description,
                chassisSpecs: params.chassisSpecs,
                engineSpecs: params.engineSpecs,
                warrantySpecs: params.warrantySpecs,
            }
        });
        await this.prisma.genericMotorbikeImage.createMany({
            data: params.images.map((i) => {
                return {
                    genericMotorbikeId: gMotorbike.id,
                    imageResourceId: i.imageResourceId,
                    isGallery: i.isGallery
                };
            })
        });
    }

    async update(id: number, updateGenericMotorbikeDto: UpsertGenericMotorbikeDto) {
        const existingMotorbike = await this.prisma.genericMotorbike.findUnique({
            where: { id },
            include: {
                images: true,
            },
        });

        if (!existingMotorbike) {
            throw new NotFoundException(`Generic motorbike with ID ${id} not found`);
        }

        const updatedMotorbike = await this.prisma.genericMotorbike.update({
            where: { id },
            data: {
                category: updateGenericMotorbikeDto.category,
                model: updateGenericMotorbikeDto.model,
                name: updateGenericMotorbikeDto.name,
                description: updateGenericMotorbikeDto.description,
                engineSpecs: updateGenericMotorbikeDto.engineSpecs,
                chassisSpecs: updateGenericMotorbikeDto.chassisSpecs,
                warrantySpecs: updateGenericMotorbikeDto.warrantySpecs,
                recommendedPrice: updateGenericMotorbikeDto.recommendedPrice,
                images: {
                    deleteMany: {},
                    create: updateGenericMotorbikeDto.images.map(image => ({
                        imageResourceId: image.imageResourceId,
                        isGallery: image.isGallery,
                    })),
                },
            },
            include: {
                images: true,
            },
        });

        return updatedMotorbike;
    }

    async delete(id: number) {
        const existingMotorbike = await this.prisma.genericMotorbike.findUnique({
            where: { id },
        });

        if (!existingMotorbike) {
            throw new NotFoundException(`Generic motorbike with ID ${id} not found`);
        }

        await this.prisma.genericMotorbike.delete({
            where: { id },
        });

        return { message: `Generic motorbike with ID ${id} has been deleted` };
    }

    async findById(id: number) {
        return this.prisma.genericMotorbike.findFirst({
            where: {
                id
            },
            include: {
                images: {
                    select: {
                        imageResource: true,
                        isGallery: true
                    },
                }
            }
        })   
    }

    async paginate(page: number = 1, perPage: number = 10, name?: string, category?: Category, minPrice: number = 0, maxPrice: number = Number.MAX_SAFE_INTEGER) {
        const skip = (page - 1) * perPage;

        const where: Prisma.GenericMotorbikeWhereInput = {
            recommendedPrice: {
                gte: minPrice,
                lte: maxPrice
            }
        }
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive'
            }
        }
        if (category) {
            where.category = category
        }

        const [items, total] = await Promise.all([
            this.prisma.genericMotorbike.findMany({
                where,
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                include: {
                    images: {
                        select: {
                            imageResource: true,
                            isGallery: true
                        },
                    }
                }
            }),
            this.prisma.genericMotorbike.count({ where }),
        ]);

        const totalPages = Math.ceil(total / perPage);

        return {
            items,
            meta: {
                total,
                page,
                perPage,
                totalPages,
            },
        };
    }
}