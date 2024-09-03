import { IsString } from 'class-validator';

export default class UpdateResourceRequest {
    @IsString()
    fileName: string;
}
