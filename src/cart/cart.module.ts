import { GenericMotorbikeModule } from "@/generic_motorbikes/generic_motorbikes.module";
import { forwardRef, Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { PrismaService } from "@/shared/PrismaClient";
import CouponsModule from "@/coupons/coupons.module";
import CouponsService from "@/coupons/coupons.service";

@Module({
    imports: [forwardRef(() => GenericMotorbikeModule), CouponsModule],
    providers: [CartService, PrismaService, CouponsService],
    exports: [CartService],
    controllers: [CartController]
})
export class CartModule {
}