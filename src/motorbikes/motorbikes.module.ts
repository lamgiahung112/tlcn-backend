import { Module } from "@nestjs/common";
import { MotorbikeService } from "./motorbikes.service";
import { MotorbikeController } from "./motorbikes.controller";
import { PrismaService } from "@/shared/PrismaClient";

@Module({
    controllers: [MotorbikeController],
    providers: [MotorbikeService, PrismaService],
    exports: [MotorbikeService]
})
export class MotorbikeModule {}