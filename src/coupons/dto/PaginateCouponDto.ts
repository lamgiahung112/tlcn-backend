import { CouponType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export default class PaginateCouponDto {
    @IsNumber()
    page: number;

    @IsNumber()
    perPage: number;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsEnum(CouponType)
    type?: CouponType;
}
