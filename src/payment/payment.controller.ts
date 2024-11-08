import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('create-order')
    async createOrder(@Body() body: { amount: number }) {
        try {
            const order = await this.paymentService.createOrder(body.amount);
            console.log(order);
            return order;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
