import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';
import UpdateMotorbikeRequest from '../dto/UpdateMotorbikeRequest';
import GalleryRepository from './gallery.repository';
import VariantRepository from './variant.repository';
import MotorbikeDetailRepository from './motorbike_detail.repository';
import FilterMotorbikeRequest from '../dto/FilterMotorbikeRequest';

@Injectable()
export default class MotorbikeRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly galleryRepository: GalleryRepository,
        private readonly variantRepository: VariantRepository,
        private readonly detailRepository: MotorbikeDetailRepository
    ) {}

    private motorbikeSelect: Prisma.MotorbikeSelect = {
        id: true,
        name: true,
        category: true,
        model_id: true,
        recommended_price: true,
        description: true,
        model: {
            select: {
                id: true,
                name: true
            }
        },
        chassisSpecs: true,
        engineSpecs: true,
        sizeSpecs: true,
        warrantySpecs: true,
        gallery: true,
        variants: true
    };

    private motorbikeFullSelect: Prisma.MotorbikeSelect = {
        id: true,
        name: true,
        category: true,
        model_id: true,
        recommended_price: true,
        description: true,
        model: {
            select: {
                id: true,
                name: true
            }
        },
        chassisSpecs: true,
        engineSpecs: true,
        sizeSpecs: true,
        warrantySpecs: true,
        gallery: {
            select: {
                resource: {
                    select: {
                        id: true,
                        url: true,
                        name: true
                    }
                }
            }
        },
        variants: {
            select: {
                id: true,
                color: true,
                displayPictures: {
                    select: {
                        resource: {
                            select: {
                                id: true,
                                url: true,
                                name: true
                            }
                        }
                    }
                }
            }
        },
        details: true
    };

    async update(id: string, data: UpdateMotorbikeRequest) {
        const jobs = [] as Promise<any>[];

        jobs.push(this.galleryRepository.update(id, data.gallery));
        jobs.push(this.variantRepository.update(id, data.variants));
        jobs.push(this.detailRepository.update(id, data.detail));
        jobs.push(
            this.prisma.motorbike.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    category: data.category,
                    model_id: data.modelId,
                    recommended_price: data.recommendedPrice,
                    description: data.description,
                    engineSpecs: data.engineSpecs,
                    chassisSpecs: data.chassisSpecs,
                    sizeSpecs: data.sizeSpecs,
                    warrantySpecs: data.warrantySpecs
                }
            })
        );

        return Promise.all(jobs);
    }

    async create(data: UpdateMotorbikeRequest) {
        const motorbike = await this.prisma.motorbike.create({
            data: {
                name: data.name,
                category: data.category,
                model_id: data.modelId,
                recommended_price: data.recommendedPrice,
                description: data.description,
                chassisSpecs: data.chassisSpecs,
                engineSpecs: data.engineSpecs,
                sizeSpecs: data.sizeSpecs,
                warrantySpecs: data.warrantySpecs
            }
        });

        const jobs = [] as Promise<any>[];

        jobs.push(this.galleryRepository.update(motorbike.id, data.gallery));
        jobs.push(this.variantRepository.update(motorbike.id, data.variants));
        jobs.push(this.detailRepository.update(motorbike.id, data.detail));

        await Promise.all(jobs);

        return motorbike;
    }

    getList(filter: FilterMotorbikeRequest) {
        // const { minPrice, maxPrice, category, sort, search } = filter;

        // const where: Prisma.MotorbikeWhereInput = {
        //     name: {
        //         contains: search,
        //         mode: 'insensitive'
        //     },
        //     recommended_price: {
        //         gte: minPrice,
        //         lte: maxPrice
        //     },
        //     category: category
        // };

        return this.prisma.motorbike.findMany({
            // where,
            // orderBy: sort,
            select: this.motorbikeSelect,
            skip: (filter.page - 1) * filter.size,
            take: filter.size
        });
    }

    getById(id: string) {
        return this.prisma.motorbike.findUnique({
            where: {
                id
            },
            select: this.motorbikeFullSelect
        });
    }
}
