import { PrismaService } from '@/shared/PrismaClient';
import CouponDto from './dto/CouponDto';
import PaginateCouponDto from './dto/PaginateCouponDto';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CouponsService {
    constructor(private prisma: PrismaService) {}

    async createCoupon(dto: CouponDto) {
        const coupon = await this.prisma.coupon.create({
            data: dto
        });
        return coupon;
    }

    async updateCoupon(id: number, dto: CouponDto) {
        const coupon = await this.prisma.coupon.update({
            where: { id },
            data: dto
        });
        return coupon;
    }

    async publishCoupon(id: number) {
        const coupon = await this.prisma.coupon.update({
            where: { id },
            data: { isPublished: true }
        });
        return coupon;
    }

    async unpublishCoupon(id: number) {
        const coupon = await this.prisma.coupon.update({
            where: { id },
            data: { isPublished: false }
        });
        return coupon;
    }

    async paginate(dto: PaginateCouponDto) {
        const { page, perPage, code, type } = dto;
        const where: Prisma.CouponWhereInput = {};

        if (code) where.code = { equals: code };
        if (type) where.type = { equals: type };

        const total = await this.prisma.coupon.count({ where });

        const coupons = await this.prisma.coupon.findMany({
            where,
            take: perPage,
            skip: (page - 1) * perPage
        });
        return {
            items: coupons,
            meta: {
                total,
                totalPages: Math.ceil(total / perPage),
                page,
                perPage
            }
        };
    }

    async getCoupon(code: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code },
            include: {
                itemImageResource: true
            }
        });
        return coupon;
    }

    async deleteCoupon(id: number) {
        const coupon = await this.prisma.coupon.delete({
            where: { id }
        });
        return coupon;
    }

    async getCouponWithOrders(code: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code },
            include: {
                orders: true,
                itemImageResource: true
            }
        });
        return coupon;
    }
}
