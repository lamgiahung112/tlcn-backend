import { IsNumber, Min } from 'class-validator';

abstract class PaginationDto {
    @Min(0)
    @IsNumber()
    page: number;
    @Min(1)
    @IsNumber()
    size: number;
}

export default PaginationDto;
