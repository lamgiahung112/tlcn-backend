import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginatePostDto {
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @IsNumber()
    @IsNotEmpty()
    perPage: number;

    @IsString()
    @IsOptional()
    name?: string;
}
