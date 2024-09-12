import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class UpdateColorRequest {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    hex: string;
}
