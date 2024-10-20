import { Category } from '@prisma/client';
import { IsAscii, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterGenericMotorbikeDto {
    @IsNumber()
    @Min(1)
    page: number;

    @IsNumber()
    @Min(0)
    perPage: number;

    @IsString()
    @IsAscii()
    @IsOptional()
    name?: string;

    @IsOptional()
    category?: Category;

    @IsOptional()
    minPrice?: number;

    @IsOptional()
    maxPrice?: number;
}
