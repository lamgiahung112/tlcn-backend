import { Module } from '@nestjs/common';
import * as services from './services';
import { OrdersController } from './orders.controller';
import { PaymentModule } from '@/payment/payment.module';
import { PrismaService } from '@/shared/PrismaClient';

@Module({
    controllers: [OrdersController],
    providers: [...Object.values(services), PrismaService],
    exports: Object.values(services),
    imports: [PaymentModule]
})
export class OrdersModule {}
