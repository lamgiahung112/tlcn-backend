import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostRequest from './dto/CreatePostRequest';
import EditPostRequest from './dto/EditPostRequest';

@Controller('posts')
export default class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/:id')
    async getPostDetail(@Param('id') id: string) {
        const post = await this.postsService.getPostDetail(id);
        return { data: post };
    }

    @Get()
    async getPostList() {
        const posts = await this.postsService.getPostList();
        return { data: posts };
    }

    @Post()
    async createPost(@Body() data: CreatePostRequest) {
        return await this.postsService.createPost(data);
    }

    @Put('/:id')
    async editPost(@Body() data: EditPostRequest) {
        return await this.postsService.editPost(data);
    }
}
