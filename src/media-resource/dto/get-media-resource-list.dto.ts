import { Sortable } from '@/shared/dto/sortable.dto';
import { IsNumberString, IsObject, Min } from 'class-validator';

export class GetMediaResourceListDto {
    @IsObject()
    sort?: Sortable<'created_at'>;
    @Min(0)
    @IsNumberString()
    page: number;
    @IsNumberString()
    @Min(10)
    size: number;
}
