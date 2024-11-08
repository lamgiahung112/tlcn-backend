import { PrismaService } from '@/shared/PrismaClient';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateOrderDto } from '../dto';
import { randomUUID } from 'crypto';
import { OrderStatus } from '@prisma/client';
import { PaymentService } from '@/payment/payment.service';
import { FilterOrderDto } from '../dto/FilterOrderDto';
import { MailerService } from '@/notifications/mailer.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paymentService: PaymentService,
        private readonly mailerService: MailerService
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

        const capture = await this.paymentService.captureOrder(
            data.paypalOrderId
        );
        if (!capture) {
            await this.cancelOrder(
                order.publicOrderId,
                'Payment capture failed'
            );
            throw new BadRequestException('Payment capture failed');
        }

        await this.prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paypalOrderId: data.paypalOrderId
            }
        });

        const mailOrder = await this.getByPublicOrderIdAndEmail(
            order.publicOrderId,
            order.customerEmail
        );
        this.mailerService.sendMail(
            data.customer.customerEmail,
            'Order Confirmation - Yamaha',
            'order_success',
            {
                order: mailOrder
            }
        );

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
                }
            }
        });
    }

    async getAdminOrder(publicOrderId: string) {
        const order = await this.prisma.order.findUnique({
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
                                warrantySpecs: true,
                                name: true,
                                colorInHex: true,
                                colorName: true,
                                category: true
                            }
                        }
                    }
                }
            }
        });
        this.mailerService.sendMail(
            order.customerEmail,
            'Reminder for motorbike service',
            'service_reminder',
            {
                order
            }
        );
        return order;
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
        await this.prisma.order
            .update({
                where: {
                    publicOrderId
                },
                data: {
                    status: OrderStatus.CONFIRMED,
                    confirmedAt: new Date()
                }
            })
            .then(async (order) => {
                const mailOrder = await this.getAdminOrder(order.publicOrderId);
                this.mailerService.sendMail(
                    order.customerEmail,
                    'Order Updated - Yamaha',
                    'order_status_updated',
                    { order: mailOrder }
                );
            });
    }

    async markOrderStartedDelivery(publicOrderId: string) {
        await this.prisma.order
            .update({
                where: {
                    publicOrderId
                },
                data: {
                    status: OrderStatus.DELIVERY_STARTED,
                    startedDeliveryAt: new Date()
                }
            })
            .then(async (order) => {
                const mailOrder = await this.getAdminOrder(order.publicOrderId);
                this.mailerService.sendMail(
                    order.customerEmail,
                    'Order Updated - Yamaha',
                    'order_status_updated',
                    { order: mailOrder }
                );
            });
    }

    async markOrderComplete(publicOrderId: string) {
        await this.prisma.order
            .update({
                where: {
                    publicOrderId
                },
                data: {
                    status: OrderStatus.COMPLETED,
                    completedAt: new Date()
                }
            })
            .then(async (order) => {
                const mailOrder = await this.getAdminOrder(order.publicOrderId);
                this.mailerService.sendMail(
                    order.customerEmail,
                    'Order Updated - Yamaha',
                    'order_status_updated',
                    { order: mailOrder }
                );
            });
    }

    async cancelOrder(publicOrderId: string, reason: string) {
        const order = await this.prisma.order.findUnique({
            where: { publicOrderId },
            include: {
                orderItems: {
                    include: {
                        motorbike: true
                    }
                }
            }
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        // Update all motorbikes to not sold
        await this.prisma.motorbike.updateMany({
            where: {
                id: {
                    in: order.orderItems.map((item) => item.motorbikeId)
                }
            },
            data: {
                isSold: false
            }
        });

        // Update the order status
        const updatedOrder = await this.prisma.order.update({
            where: { publicOrderId },
            data: {
                status: OrderStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelReason: reason
            }
        });

        // Send email notification
        const mailOrder = await this.getAdminOrder(updatedOrder.publicOrderId);
        this.mailerService.sendMail(
            updatedOrder.customerEmail,
            'Order Updated - Yamaha',
            'order_status_updated',
            { order: mailOrder }
        );
        return updatedOrder;
    }
}
