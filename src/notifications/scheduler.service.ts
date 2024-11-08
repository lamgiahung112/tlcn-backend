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

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    async remindMotorbikeForService() {
        const orders = await this.prisma.order.findMany({
            where: {
                status: OrderStatus.COMPLETED
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
                                warrantySpecs: true
                            }
                        }
                    }
                }
            }
        });

        for (const order of orders) {
            const currentDate = new Date();
            const completedDate = new Date(order.completedAt);

            const daysSinceCompletion = Math.floor(
                (currentDate.getTime() - completedDate.getTime()) /
                    (1000 * 60 * 60 * 24)
            );

            if (daysSinceCompletion > 0 && daysSinceCompletion % 30 === 0) {
                await this.mailerService.sendMail(
                    order.customerEmail,
                    'Reminder for motorbike service',
                    'service_reminder',
                    {
                        order
                    }
                );
            }
        }
    }
}
