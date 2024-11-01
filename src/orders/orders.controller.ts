import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './services';
import { CreateOrderDto } from './dto';
import { FilterOrderDto } from './dto/FilterOrderDto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() data: CreateOrderDto) {
        return this.orderService.createOrder(data);
    }

    @Get()
    async filterOrders(@Query() data: FilterOrderDto) {
        return this.orderService.filterOrders(data);
    }

    @Post(':publicOrderId')
    async getOrder(@Param('publicOrderId') publicOrderId: string, @Body('email') email: string) {
        return this.orderService.getByPublicOrderIdAndEmail(publicOrderId, email);
    }

    @Get('admin/:publicOrderId')
    async getAdminOrder(@Param('publicOrderId') publicOrderId: string) {
        return this.orderService.getAdminOrder(publicOrderId);
    }

    @Post('admin/:publicOrderId/confirm')
    async confirmOrder(@Param('publicOrderId') publicOrderId: string) {
        return this.orderService.confirmOrder(publicOrderId);
    }

    @Post('admin/:publicOrderId/start-delivery')
    async startDelivery(@Param('publicOrderId') publicOrderId: string) {
        return this.orderService.markOrderStartedDelivery(publicOrderId);
    }

    @Post('admin/:publicOrderId/complete')
    async completeOrder(@Param('publicOrderId') publicOrderId: string) {
        return this.orderService.markOrderComplete(publicOrderId);
    }

    @Post('admin/:publicOrderId/cancel')
    async cancelOrder(@Param('publicOrderId') publicOrderId: string, @Body('reason') reason: string) {
        return this.orderService.cancelOrder(publicOrderId, reason);
    }
}
