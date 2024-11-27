import { Module } from '@nestjs/common';
import CouponsController from './coupons.controller';
import CouponsService from './coupons.service';
import { PrismaService } from '@/shared/PrismaClient';

@Module({
    controllers: [CouponsController],
    providers: [CouponsService, PrismaService]
})
export default class CouponsModule {}
