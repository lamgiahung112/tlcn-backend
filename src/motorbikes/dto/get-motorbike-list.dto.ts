import PaginationDto from '@/shared/dto/pagination.dto';
import { Sortable } from '@/shared/dto/sortable.dto';
import { IsArray, IsNumber, IsObject, IsString, Min } from 'class-validator';

class GetMotorbikeListDto extends PaginationDto {
    @IsString()
    category?: string;
    @IsString()
    name?: string;
    @Min(0)
    @IsNumber()
    minPrice?: number;
    @Min(0)
    @IsNumber()
    maxPrice?: number;
    @IsObject()
    sort?: Sortable<'recommendedPrice'>;
    @IsArray()
    color?: string[];
}

export default GetMotorbikeListDto;
