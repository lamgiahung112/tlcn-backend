import { Sortable } from '@/shared/dto/sortable.dto';
import { IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class GetMediaResourceListDto {
    @IsObject()
    @IsOptional()
    sort?: Sortable<'created_at'>;

    @IsString()
    @IsOptional()
    name?: string;

    @Min(0)
    @IsNumber()
    page: number;

    @IsNumber()
    @Min(10)
    size: number;
}
