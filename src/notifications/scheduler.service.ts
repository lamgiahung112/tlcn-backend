import { PrismaService } from '@/shared/PrismaClient';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderStatus } from '@prisma/client';
import { MailerService } from './mailer.service';

@Injectable()
export class SchedulerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailerService: MailerService
    ) {}

    @Cron(CronExpression.EVERY_WEEK)
    async remindMotorbikeForService() {
        const completedOrders = await this.prisma.order.findMany({
            where: {
                status: OrderStatus.COMPLETED
            },
            include: {
                orderItems: {
                    include: {
                        motorbike: {
                            include: {
                                genericMotorbike: true
                            }
                        }
                    }
                },
                customer: true
            }
        });

        completedOrders.forEach((order) => {
            const customer = order.customer;
            const motorbikes = order.orderItems.map((item) => item.motorbike);

            motorbikes.forEach(async (motorbike) => {
                const monthsSinceSold = Math.ceil(
                    (new Date().getTime() - motorbike.soldAt.getTime()) /
                        (1000 * 60 * 60 * 24 * 30)
                );
                const serviceToken = await this.prisma.serviceToken.findFirst({
                    where: {
                        motorbikeId: motorbike.id,
                        maxOdometer: {
                            lte: motorbike.odometer
                        },
                        minMonth: {
                            lte: monthsSinceSold
                        },
                        usedAt: {
                            equals: null
                        }
                    }
                });
                if (serviceToken) {
                    await this.mailerService.sendMail(
                        customer.email,
                        'Hãy đến bảo dưỡng xe của bạn tại Yamaha',
                        'service_reminder',
                        {
                            motorbike,
                            customer,
                            serviceToken
                        }
                    );
                }
            });
        });
    }
}
