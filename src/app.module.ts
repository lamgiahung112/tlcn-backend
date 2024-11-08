import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageResourcesModule } from './image_resources/image_resources.module';
import { GenericMotorbikeModule } from './generic_motorbikes/generic_motorbikes.module';
import { MotorbikeModule } from './motorbikes/motorbikes.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ScheduleModule.forRoot(),
        AuthModule,
        ImageResourcesModule,
        GenericMotorbikeModule,
        MotorbikeModule,
        OrdersModule,
        CartModule,
        PaymentModule,
        NotificationsModule
    ]
})
export class AppModule {}
