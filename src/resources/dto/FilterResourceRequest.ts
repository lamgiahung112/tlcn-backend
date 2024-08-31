import PaginationDto from '@/shared/dto/pagination.dto';
import { Sortable } from '@/shared/dto/sortable.dto';
import { IsObject, IsOptional, IsString } from 'class-validator';

export default class FilterResourceRequest extends PaginationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsObject()
    sort: Sortable<'created_at'>;
}
