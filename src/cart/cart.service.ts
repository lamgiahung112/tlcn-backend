import { PrismaService } from "@/shared/PrismaClient";
import { Injectable } from "@nestjs/common";
import { CartDetailDto } from "./dto/get_cart_detail.dto";
import CouponsService from "@/coupons/coupons.service";
import { CouponType } from "@prisma/client";

@Injectable()
export class CartService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly couponsService: CouponsService
    ) {}

    async getCartDetail(cartDetailDto: CartDetailDto[], couponCode: string) {
        const maxQuantity: Record<number, number> = {}
        const errors: Record<number, string> = {}
        const result = await Promise.all(
            cartDetailDto.map(async (item) => {
                const motorbikes = await this.prisma.motorbike.findMany({
                    where: {
                        genericMotorbikeId: item.genericMotorbikeId,
                        isSold: false
                    },
                    select: {
                        price: true,
                        id: true,
                        genericMotorbike: {
                            select: {
                                id: true,
                                name: true,
                                colorName: true,
                                images: {
                                    take: 1,
                                    select: {
                                        imageResource: true
                                    },
                                    where: {
                                        isGallery: false
                                    }
                                }
                            }
                        },
                    },
                });

                // Adjust quantity if requested amount exceeds available bikes
                const availableQuantity = motorbikes.length;
                maxQuantity[item.genericMotorbikeId] = availableQuantity
                const adjustedQuantity = Math.min(item.quantity, availableQuantity);

                if (adjustedQuantity < item.quantity) {
                    errors[item.genericMotorbikeId] = `Only ${availableQuantity} ${motorbikes[0]?.genericMotorbike.name} available`
                }

                return {
                    item: {
                        id: motorbikes[0]?.genericMotorbike.id || 0,
                        name: motorbikes[0]?.genericMotorbike.name || '',
                        color: motorbikes[0]?.genericMotorbike.colorName || '',
                        price: motorbikes[0]?.price || 0,
                        image: motorbikes[0]?.genericMotorbike.images[0]?.imageResource.s3Key || '',
                    },
                    quantity: adjustedQuantity
                };
            })
        );

        // calculate total price
        const totalPrice = result.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

        let couponDiscount = 0;
        let coupon = null;
        if (couponCode) {
            coupon = await this.couponsService.getCoupon(couponCode);
            if (coupon && coupon.discount && coupon.type === CouponType.PERCENTAGE) {
                couponDiscount = (totalPrice * coupon.discount) / 100;
            } else if (coupon && coupon.discount && coupon.type === CouponType.FIXED) {
                   couponDiscount = coupon.discount;
            }
        }

        return { cart: result, metadata: { totalPrice: totalPrice - couponDiscount, maxQuantity, errors, coupon } };
    }
}