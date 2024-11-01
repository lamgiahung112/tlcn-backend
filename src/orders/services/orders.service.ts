import { PrismaService } from '@/shared/PrismaClient';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto';
import { randomUUID } from 'crypto';
import { OrderStatus } from '@prisma/client';
import { PaymentService } from '@/payment/payment.service';
import { FilterOrderDto } from '../dto/FilterOrderDto';

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
        const total = flatMotorbikes.reduce(
            (prev, curr) => prev + curr.price,
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
                        data: flatMotorbikes.map((motorbike) => {
                            return {
                                motorbikeId: motorbike.id,
                                createdAt: new Date()
                            };
                        })
                    }
                },
                orderCartItems: {
                    createMany: {
                        data: data.cart.map((cartItem) => {
                            return {
                                genericMotorbikeId: cartItem.genericMotorbikeId,
                                quantity: cartItem.quantity
                            };
                        })
                    }
                },
                status: OrderStatus.CREATED
            }
        });

        const paymentResult = await this.paymentService.tryPayment(
            data.paymentMethodId,
            order.total
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
            data: {
                isSold: true
            },
            where: {
                id: {
                    in: flatMotorbikes.map((motorbike) => motorbike.id)
                }
            }
        });
        await this.prisma.charge.create({
            data: {
                amount: paymentResult.amount,
                transaction_id: paymentResult.transaction_id,
                orderId: order.id
            }
        });

        return order;
    }

    async getByPublicOrderIdAndEmail(publicOrderId: string, email: string) {
        return this.prisma.order.findUnique({
            where: {
                publicOrderId,
                customerEmail: email
            },
            include: {
                orderItems: {
                    select: {
                        motorbike: {
                            select: {
                                genericMotorbikeId: true,
                                price: true,
                                engineCode: true,
                                chassisCode: true
                            }
                        }
                    }
                },
                orderCartItems: {
                    select: {
                        genericMotorbike: {
                            select: {
                                id: true,
                                images: {
                                    where: {
                                        isGallery: false
                                    },
                                    select: {
                                        imageResource: true
                                    },
                                    take: 1
                                },
                                name: true,
                                colorInHex: true,
                                colorName: true,
                                category: true
                            }
                        }
                    }
                },
                charge: true
            }
        });
    }

    async getAdminOrder(publicOrderId: string) {
        return this.prisma.order.findUnique({
            where: {
                publicOrderId
            },
            include: {
                orderItems: {
                    select: {
                        motorbike: {
                            select: {
                                genericMotorbikeId: true,
                                price: true,
                                engineCode: true,
                                chassisCode: true
                            }
                        }
                    }
                },
                orderCartItems: {
                    select: {
                        genericMotorbike: {
                            select: {
                                id: true,
                                images: {
                                    where: {
                                        isGallery: false
                                    },
                                    select: {
                                        imageResource: true
                                    },
                                    take: 1
                                },
                                name: true,
                                colorInHex: true,
                                colorName: true,
                                category: true
                            }
                        }
                    }
                },
                charge: true
            }
        });
    }

    async filterOrders(data: FilterOrderDto) {
        const total = await this.prisma.order.count({
            where: {
                publicOrderId: {
                    contains: data.publicOrderId
                },
                status: data.status
            },
            skip: (data.page - 1) * data.perPage,
            take: data.perPage
        });
        const orders = await this.prisma.order.findMany({
            where: {
                publicOrderId: {
                    contains: data.publicOrderId
                },
                status: data.status
            },
            skip: (data.page - 1) * data.perPage,
            take: data.perPage
        });
        return {
            items: orders,
            meta: {
                total,
                totalPages: Math.ceil(total / data.perPage)
            }
        };
    }

    async confirmOrder(publicOrderId: string) {
        await this.prisma.order.update({
            where: {
                publicOrderId
            },
            data: {
                status: OrderStatus.CONFIRMED,
                confirmedAt: new Date()
            }
        });
    }

    async markOrderStartedDelivery(publicOrderId: string) {
        await this.prisma.order.update({
            where: {
                publicOrderId
            },
            data: {
                status: OrderStatus.DELIVERY_STARTED,
                startedDeliveryAt: new Date()
            }
        });
    }

    async markOrderComplete(publicOrderId: string) {
        await this.prisma.order.update({
            where: {
                publicOrderId
            },
            data: {
                status: OrderStatus.COMPLETED,
                completedAt: new Date()
            }
        });
    }

    async cancelOrder(publicOrderId: string, reason: string) {
        await this.prisma.order.update({
            where: {
                publicOrderId
            },
            data: {
                status: OrderStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelReason: reason
            }
        });
    }
}
