import PaginationDto from '@/shared/dto/pagination.dto';
import { Sortable } from '@/shared/dto/sortable.dto';
import { PrismaService } from '@/shared/PrismaClient';
import { Prisma } from '@prisma/client';

export default class MotorbikeRepository {
    constructor(private readonly prisma: PrismaService) {}

    private minimalSelectArgs: Prisma.MotorbikeSelect = {
        id: true,
        name: true,
        description: true,
        colors: true,
        category: true,
        recommended_price: true
    };

    private fullSelectArgs: Prisma.MotorbikeSelect = {
        ...this.minimalSelectArgs,
        details: {
            select: {
                description: true
            }
        },
        chassisSpecs: true,
        engineSpecs: true,
        sizeSpecs: true,
        warrantySpecs: true,
        gallery: {
            select: {
                resource: true
            }
        },
        model: {
            select: {
                name: true
            }
        }
    };

    insert(args: Prisma.MotorbikeCreateInput) {
        return this.prisma.motorbike.create({
            data: args
        });
    }

    list(
        conditions: Prisma.MotorbikeWhereInput,
        paginator: PaginationDto,
        sort: Sortable<'recommended_price'>
    ) {
        return this.prisma.motorbike.findMany({
            skip: paginator.page * paginator.size,
            take: paginator.size,
            select: this.minimalSelectArgs,
            orderBy: sort,
            where: conditions
        });
    }

    fullDetail(id: string) {
        return this.prisma.motorbike.findUnique({
            where: {
                id
            },
            select: this.fullSelectArgs
        });
    }
}
