import { Module } from '@nestjs/common';
import { MotorbikesService } from './motorbikes.service';
import { MotorbikesController } from './motorbikes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
    controllers: [MotorbikesController],
    providers: [MotorbikesService],
    imports: [TypeOrmModule.forFeature([Motorbike]), AuthModule]
})
export class MotorbikesModule {}
