import { Module } from '@nestjs/common';
import { MotorbikesService } from './motorbikes.service';
import { MotorbikesController } from './motorbikes.controller';
import {
    Motorbike,
    MotorbikeSchema
} from '@/motorbikes/entities/motorbike.entity';
import { AuthModule } from '@/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [MotorbikesController],
    providers: [MotorbikesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Motorbike.name,
                schema: MotorbikeSchema
            }
        ]),
        AuthModule
    ]
})
export class MotorbikesModule {}
