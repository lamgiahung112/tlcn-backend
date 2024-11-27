import { Body, Controller, Post, Query } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDetailDto } from "./dto/get_cart_detail.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('detail')
    getCartDetail(@Body() cartDetailDto: CartDetailDto[], @Query('couponCode') couponCode: string) {
        return this.cartService.getCartDetail(cartDetailDto, couponCode)
    }
}
