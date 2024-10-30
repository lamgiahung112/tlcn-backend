import { GenericMotorbikeModule } from "@/generic_motorbikes/generic_motorbikes.module";
import { forwardRef, Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { PrismaService } from "@/shared/PrismaClient";

@Module({
    imports: [forwardRef(() => GenericMotorbikeModule)],
    providers: [CartService, PrismaService],
    exports: [CartService],
    controllers: [CartController]
})
export class CartModule {
}