import { CouponType } from '@prisma/client';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export default class CouponDto {
    @IsString()
    @IsNotEmpty()
    code: string;
    @IsNumber()
    @IsOptional()
    discount?: number;

    @IsEnum(CouponType)
    type: CouponType;

    @IsOptional()
    itemImageResourceId?: number;

    @IsOptional()
    itemName?: string;

    @IsOptional()
    @IsDate()
    expiredAt?: Date;

    @IsOptional()
    maxUsage?: number;
}
