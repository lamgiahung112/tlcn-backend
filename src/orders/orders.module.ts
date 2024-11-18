import { Module } from '@nestjs/common';
import * as services from './services';
import { OrdersController } from './orders.controller';
import { PaymentModule } from '@/payment/payment.module';
import { PrismaService } from '@/shared/PrismaClient';
import { NotificationsModule } from '@/notifications/notifications.module';
import { AuthService } from '@/auth/auth.service';

@Module({
    controllers: [OrdersController],
    providers: [...Object.values(services), PrismaService, AuthService],
    exports: Object.values(services),
    imports: [PaymentModule, NotificationsModule]
})
export class OrdersModule {}
