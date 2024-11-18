import { OrderStatus } from "@prisma/client"
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class FilterOrderDto {
    @IsNumber()
    @Min(1)
    page: number
    @IsNumber()
    @Min(1)
    perPage: number
    @IsOptional()
    @IsString()
    publicOrderId?: string
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus
    @IsOptional()
    @IsNumber()
    customerId?: number
}