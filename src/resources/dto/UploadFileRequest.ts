import { IsString } from 'class-validator';

export default class UploadFileRequest {
    @IsString()
    name: string;
}
