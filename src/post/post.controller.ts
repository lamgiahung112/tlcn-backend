import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { PostService } from './post.service';
import { PaginatePostDto } from './dto/PaginatePostDto';
import { PostRequestDto } from './dto/PostRequestDto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async paginate(@Query() query: PaginatePostDto) {
        return this.postService.paginate(query.page, query.perPage, query.name);
    }

    @Get('admin')
    async adminPaginate(@Query() query: PaginatePostDto) {
        return this.postService.adminPaginate(
            query.page,
            query.perPage,
            query.name
        );
    }

    @Post()
    async createPost(@Body() body: PostRequestDto) {
        return this.postService.createPost(body);
    }

    @Put(':id')
    async updatePost(@Param('id') id: number, @Body() body: PostRequestDto) {
        return this.postService.updatePost(id, body);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }

    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return this.postService.getPost(id);
    }

    @Put(':id/publish')
    async publishPost(@Param('id') id: number) {
        return this.postService.publishPost(id);
    }

    @Put(':id/unpublish')
    async unpublishPost(@Param('id') id: number) {
        return this.postService.unpublishPost(id);
    }
}
