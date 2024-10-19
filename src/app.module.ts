import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageResourcesModule } from './image_resources/image_resources.module';
import { GenericMotorbikeModule } from './generic_motorbikes/generic_motorbikes.module';
import { MotorbikeModule } from './motorbikes/motorbikes.module';
import { OrdersModule } from './orders/orders.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        ImageResourcesModule,
        GenericMotorbikeModule,
        MotorbikeModule,
        OrdersModule
    ]
})
export class AppModule {}
