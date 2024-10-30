import { IsNumber, Min } from "class-validator"

export class CartDetailDto {
    @IsNumber()
    @Min(1)
    genericMotorbikeId: number

    @IsNumber()
    @Min(1)
    quantity: number
}