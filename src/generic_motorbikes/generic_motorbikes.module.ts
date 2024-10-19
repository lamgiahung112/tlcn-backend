import { Module } from "@nestjs/common";
import { GenericMotorbikeService } from "./generic_motorbikes.service";
import { GenericMotorbikeController } from "./generic_motorbikes.controller";
import { PrismaService } from "@/shared/PrismaClient";

@Module({
    controllers: [GenericMotorbikeController],
    providers: [GenericMotorbikeService, PrismaService],
    exports: [GenericMotorbikeService]
})
export class GenericMotorbikeModule {}