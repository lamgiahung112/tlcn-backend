import { IsNumberString, Min } from 'class-validator';

abstract class PaginationDto {
    @Min(0)
    @IsNumberString()
    page: number;
    @Min(10)
    @IsNumberString()
    size: number;
}

export default PaginationDto;
