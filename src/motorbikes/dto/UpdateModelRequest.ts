import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateModelRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
