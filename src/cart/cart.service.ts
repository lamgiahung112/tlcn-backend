import { PrismaService } from "@/shared/PrismaClient";
import { Injectable } from "@nestjs/common";
import { CartDetailDto } from "./dto/get_cart_detail.dto";

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async getCartDetail(cartDetailDto: CartDetailDto[]) {
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

        return { cart: result, metadata: { totalPrice, maxQuantity, errors } };
    }
}