import { IsString } from 'class-validator';

export default class EditPostRequest {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    thumbnail_resource_id: string;
}
