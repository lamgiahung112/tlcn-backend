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
        const availableMotorbikes = await Promise.all(
            data.cart.map(async (cartItem) => {
                const motorbikes = await this.prisma.motorbike.findMany({
                    where: {
                        genericMotorbikeId: cartItem.genericMotorbikeId,
                        isSold: false
                    },
                    take: cartItem.quantity
                });

                if (motorbikes.length < cartItem.quantity) {
                    throw new BadRequestException(
                        `Not enough available motorbikes with ID ${cartItem.genericMotorbikeId}`
                    );
                }

                return motorbikes;
            })
        );

        const flatMotorbikes = availableMotorbikes.flat();
        const total = flatMotorbikes.reduce((prev, curr) => prev + curr.price, 0);

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
                        data: flatMotorbikes.map(motorbike => {
                            return {
                                motorbikeId: motorbike.id,
                                createdAt: new Date()
                            }
                        })
                    }
                },
                orderCartItems: {
                    createMany: {
                        data: data.cart.map(cartItem => {
                            return {
                                genericMotorbikeId: cartItem.genericMotorbikeId,
                                quantity: cartItem.quantity
                            }
                        })
                    }
                },
                status: OrderStatus.CREATED
            }
        });

        const paymentResult = await this.paymentService.tryPayment(
            data.paymentMethodId,
            order.total,
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
            data: flatMotorbikes.map(motorbike => {
                return {
                    ...motorbike,
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
