import { Category } from '@prisma/client';
import { UpserGenericMotorbikeImageDto } from './UpsertGenericMotorbikeImageDto';
import { UpserGenericMotorbikeDetailDto } from './UpsertGenericMotorbikeDetailDto';
import { IsArray, IsInt, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

export class UpsertGenericMotorbikeDto {
    @IsString()
    category: Category;
    @IsString()
    model: string;
    @IsString()
    name: string;
    @IsNumber()
    @IsInt()
    recommendedPrice: number
    @IsString()
    description: string;
    @IsObject()
    engineSpecs: Record<string, string>;
    @IsObject()
    chassisSpecs: Record<string, string>;
    @IsObject()
    warrantySpecs: Record<string, string>;
    @IsArray()
    @ValidateNested()
    images: UpserGenericMotorbikeImageDto[];
    @IsArray()
    @ValidateNested()
    details: UpserGenericMotorbikeDetailDto[];
}
