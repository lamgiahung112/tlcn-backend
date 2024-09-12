import PaginationDto from '@/shared/dto/pagination.dto';
import { Sortable } from '@/shared/dto/sortable.dto';
import { Category } from '@prisma/client';

import {
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Min
} from 'class-validator';

export default class FilterMotorbikeRequest extends PaginationDto {
    @IsNumber()
    @Min(0)
    @IsOptional()
    minPrice?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    maxPrice?: number;

    @IsEnum(Category)
    @IsOptional()
    category?: Category;

    @IsObject()
    @IsOptional()
    sort?: Sortable<'recommended_price'>;

    @IsString()
    @IsOptional()
    search?: string;
}
