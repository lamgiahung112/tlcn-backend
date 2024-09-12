import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { Color } from '@prisma/client';

@Injectable()
export default class ColorRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Color[]> {
        return this.prisma.color.findMany();
    }

    async create(data: Color): Promise<Color> {
        return this.prisma.color.create({ data });
    }

    async update(id: string, data: Color): Promise<Color> {
        return this.prisma.color.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Color> {
        return this.prisma.color.delete({ where: { id } });
    }
}
