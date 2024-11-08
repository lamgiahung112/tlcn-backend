import { Injectable } from '@nestjs/common';
import * as checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { PaymentConfig } from './payment.config';

@Injectable()
export class PaymentService {
    private client: checkoutNodeJssdk.core.PayPalHttpClient;

    constructor() {
        this.client = PaymentConfig.get();
    }

    async createOrder(amount: number) {
        const amountInUSD = amount / 25410;
        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: amountInUSD.toFixed(2)
                    }
                }
            ]
        });

        try {
            const order = await this.client.execute(request);
            return order.result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async captureOrder(orderId: string) {
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(
            orderId
        );
        request.prefer('return=representation');

        try {
            const capture = await this.client.execute(request);
            return capture.result;
        } catch (err) {
            return null;
        }
    }
}
