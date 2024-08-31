import { IsArray } from 'class-validator';

export default class UploadFileRequest {
    @IsArray()
    names: string[];
}
