import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/PrismaClient';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import ResourcesService from '@/resources/resources.service';
import ResourcesModule from '@/resources/resources.module';
import ModelRepository from './repositories/model.repository';
import ModelService from './services/model.service';
import ModelController from './controllers/model.controller';
import ColorController from './controllers/color.controller';
import MotorbikeController from './controllers/motorbike.controller';
import ColorRepository from './repositories/color.repository';
import ColorService from './services/color.service';
import MotorbikeRepository from './repositories/motorbike.repository';
import MotorbikeService from './services/motorbike.service';
import GalleryRepository from './repositories/gallery.repository';
import VariantRepository from './repositories/variant.repository';
import MotorbikeDetailRepository from './repositories/motorbike_detail.repository';
import VariantPictureRepository from './repositories/variant_picture.repository';

@Module({
    imports: [AuthModule, ResourcesModule],
    controllers: [ModelController, ColorController, MotorbikeController],
    providers: [
        PrismaService,
        AuthService,
        ResourcesService,
        ModelRepository,
        ModelService,
        ColorRepository,
        ColorService,
        MotorbikeRepository,
        MotorbikeService,
        GalleryRepository,
        VariantRepository,
        MotorbikeDetailRepository,
        VariantPictureRepository
    ]
})
export default class MotorbikeModule {}
