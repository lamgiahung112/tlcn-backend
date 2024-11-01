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
}
