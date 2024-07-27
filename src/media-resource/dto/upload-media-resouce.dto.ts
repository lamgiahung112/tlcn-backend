import { IsNotEmpty, IsString } from 'class-validator';

export class UploadMediaResouceDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    type: 'IMAGE' | 'VIDEO';
    path?: string;
}
