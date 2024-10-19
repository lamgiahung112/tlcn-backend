import { IsBoolean, IsNumber } from "class-validator";

export class UpserGenericMotorbikeImageDto {
    @IsNumber()
    imageResourceId: number

    @IsBoolean()
    isGallery: boolean
}