import { IsNumber, IsString } from 'class-validator';

export class UpserGenericMotorbikeDetailDto {
    @IsNumber()
    imageResourceId: number;
    @IsString()
    title: string;
    @IsString()
    excerpt: string;
}
