import { PrismaService } from '@/shared/PrismaClient';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto';
import { randomUUID } from 'crypto';
import { OrderStatus } from '@prisma/client';
import { PaymentService } from '@/payment/payment.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paymentService: PaymentService
    ) {}

    async createOrder(data: CreateOrderDto) {
        const items = await this.prisma.motorbike.findMany({
            where: {
                id: {
                    in: data.cart.map((item) => item.motorbikeId)
                }
            }
        });
        const total = items.reduce(
            (prev, accumulate) =>
                prev +
                accumulate.id *
                    data.cart.find(
                        (cartitem) => cartitem.motorbikeId === accumulate.id
                    ).quantity,
            0
        );
        const order = await this.prisma.order.create({
            data: {
                customerName: data.customer.customerName,
                customerAddress: data.customer.customerAddress,
                customerEmail: data.customer.customerEmail,
                customerPhone: data.customer.customerPhone,
                publicOrderId: randomUUID().replaceAll('-', '').substring(0, 7),
                createdAt: new Date(),
                total,
                orderItems: {
                    createMany: {
                        data: data.cart
                    }
                },
                status: OrderStatus.CREATED
            }
        });

        const paymentResult = await this.paymentService.tryPayment(
            data.paymentMethodId,
            data.onlyPayDeposit ? order.total / 10 : order.total,
            order.id
        );

        if (!paymentResult.success) {
            await this.prisma.order.delete({
                where: {
                    id: order.id
                }
            });
            throw new BadRequestException(
                paymentResult.error ?? 'Unexpected payment error'
            );
        }

        await this.prisma.motorbike.updateMany({
            data: items.map(item => {
                return {
                    ...item,
                    isSold: true
                }
            })
        })
        await this.prisma.charge.create({
            data: {
                amount: paymentResult.amount,
                transaction_id: paymentResult.transaction_id,
                orderId: order.id
            }
        });

        return order;
    }

    async getByPublicOrderId(publicOrderId: string) {
        return this.prisma.order.findUnique({
            where: {
                publicOrderId
            }
        });
    }

    async confirmOrder(orderId: number) {
        await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: OrderStatus.CONFIRMED,
                confirmedAt: new Date()
            }
        });
    }

    async markOrderStartedDelivery(orderId: number) {
        await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: OrderStatus.DELIVERY_STARTED,
                startedDeliveryAt: new Date()
            }
        })
    }

    async markOrderComplete(orderId: number) {
        await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: OrderStatus.COMPLETED,
                completedAt: new Date()
            }
        })
    }

    async cancelOrder(orderId: number, reason: string) {
        this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: OrderStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelReason: reason
            }
        })
    }
}
