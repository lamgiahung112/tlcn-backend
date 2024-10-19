import { PrismaService } from "@/shared/PrismaClient";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpsertGenericMotorbikeDto } from "./dto/UpsertGenericMotorbikeDto";

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
        await this.prisma.genericMotorbikeDetail.createMany({
            data: params.details.map((d) => {
                return {
                    genericMotorbikeId: gMotorbike.id,
                    imageResourceId: d.imageResourceId,
                    title: d.title,
                    excerpt: d.excerpt
                };
            })
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
                details: true,
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
                details: {
                    deleteMany: {},
                    create: updateGenericMotorbikeDto.details.map(detail => ({
                        imageResourceId: detail.imageResourceId,
                        title: detail.title,
                        excerpt: detail.excerpt,
                    })),
                },
            },
            include: {
                images: true,
                details: true,
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
}