import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { OrdersService } from './services';
import { CreateOrderDto } from './dto';
import { FilterOrderDto } from './dto/FilterOrderDto';
import { Request } from 'express';
import { AuthService } from '@/auth/auth.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
        private readonly authService: AuthService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() data: CreateOrderDto, @Req() request: Request) {
        const token = request.cookies?.['user_token'];
        const customerId = await this.authService.validateUserSession(token);
        if (!customerId) {
            throw new UnauthorizedException();
        }
        return this.orderService.createOrder(customerId, data);
    }

    @Get()
    async filterOrders(@Query() data: FilterOrderDto, @Req() request: Request) {
        const token = request.cookies?.['user_token'];
        const customerId = await this.authService.validateUserSession(token);
        if (customerId) {
            data.customerId = customerId;
        }
        return this.orderService.filterOrders(data);
    }

    @Post(':publicOrderId')
    async getOrder(
        @Param('publicOrderId') publicOrderId: string,
        @Body('email') email: string
    ) {
        return this.orderService.getByPublicOrderIdAndEmail(
            publicOrderId,
            email
        );
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
    async cancelOrder(
        @Param('publicOrderId') publicOrderId: string,
        @Body('reason') reason: string
    ) {
        return this.orderService.cancelOrder(publicOrderId, reason);
    }

    @Get('customer/:publicOrderId')
    async getOrderDetailsByCustomerId(
        @Param('publicOrderId') publicOrderId: string,
        @Req() request: Request
    ) {
        const token = request.cookies?.['user_token'];
        const customerId = await this.authService.validateUserSession(token);
        if (!customerId) {
            throw new UnauthorizedException();
        }
        return this.orderService.getOrderDetailsByCustomerId(
            customerId,
            publicOrderId
        );
    }
}
