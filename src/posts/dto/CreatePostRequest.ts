import { IsString } from 'class-validator';

export default class CreatePostRequest {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    thumbnail_resource_id: string;
}
