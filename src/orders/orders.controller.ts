import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrdersService } from './services';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() data: CreateOrderDto) {
        return this.orderService.createOrder(data);
    }
}
