import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    excerpt: string;

    @IsNumber()
    @IsNotEmpty()
    thumbnailResourceId: number;
}