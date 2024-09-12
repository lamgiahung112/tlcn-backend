import { Category } from '@prisma/client';
import {
    IsArray,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator';

export default class UpdateMotorbikeRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: Category;

    @IsString()
    @IsNotEmpty()
    modelId: string;

    @IsString()
    @IsNotEmpty()
    recommendedPrice: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsObject()
    @IsNotEmpty()
    engineSpecs: Record<string, string>;

    @IsObject()
    @IsNotEmpty()
    chassisSpecs: Record<string, string>;

    @IsObject()
    @IsNotEmpty()
    sizeSpecs: Record<string, string>;

    @IsObject()
    @IsNotEmpty()
    warrantySpecs: Record<string, string>;

    @IsArray()
    @IsNotEmpty()
    gallery: string[];

    @IsArray()
    detail: UpdateMotorbikeDetailRequest[];

    @IsArray()
    @IsNotEmpty()
    variants: UpdateMotorbikeVariantRequest[];
}

export class UpdateMotorbikeDetailRequest {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    detail: string;

    @IsString()
    @IsOptional()
    resource_id: string;
}

export class UpdateMotorbikeVariantRequest {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    colorInHex: string;

    @IsArray()
    @IsNotEmpty()
    displayPictures: string[];
}
