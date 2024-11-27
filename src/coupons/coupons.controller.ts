import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import CouponsService from './coupons.service';
import CouponDto from './dto/CouponDto';
import PaginateCouponDto from './dto/PaginateCouponDto';

@Controller('coupons')
export default class CouponsController {
    constructor(private readonly couponsService: CouponsService) {}

    @Post()
    createCoupon(@Body() dto: CouponDto) {
        return this.couponsService.createCoupon(dto);
    }   

    @Put(':id')
    updateCoupon(@Param('id') id: number, @Body() dto: CouponDto) {
        return this.couponsService.updateCoupon(id, dto);
    }

    @Delete(':id')
    deleteCoupon(@Param('id') id: number) {
        return this.couponsService.deleteCoupon(id);
    }

    @Get(':code')
    getCouponWithOrders(@Param('code') code: string) {
        return this.couponsService.getCouponWithOrders(code);
    }

    @Get()
    paginate(@Query() dto: PaginateCouponDto) {
        return this.couponsService.paginate(dto);
    }

    @Put(':id/publish')
    publishCoupon(@Param('id') id: number, @Query('isPublished') isPublished: boolean) {
        if (isPublished) {
            return this.couponsService.publishCoupon(id);
        }
        return this.couponsService.unpublishCoupon(id);
    }
}
