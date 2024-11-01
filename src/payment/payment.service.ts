import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PaymentService {
    constructor() {}

    async tryPayment(
        paymentMethodId: string,
        amount: number,
    ) {
        if (paymentMethodId === 'invalid') {
            return {
                success: false,
                error: "Tài khoản không đủ để thanh toán",
                transaction_id: randomUUID(),
                amount
            }
        }
        return {
            success: true,
            error: undefined,
            transaction_id: randomUUID(),
            amount: amount
        };
    }
}
