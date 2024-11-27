import {
    Controller,
    Get,
    Param,
    Post,
    UnauthorizedException,
    Req,
    Query,
    DefaultValuePipe
} from '@nestjs/common';
import ServiceTokensService from './service_tokens.service';
import { AuthService } from '@/auth/auth.service';
import { Request } from 'express';

@Controller('service-tokens')
export default class ServiceTokensController {
    constructor(
        private readonly serviceTokensService: ServiceTokensService,
        private readonly authService: AuthService
    ) {}

    @Post('/:id/used')
    async markServiceTokenUsed(@Param('id') id: string) {
        return this.serviceTokensService.markServiceTokenUsed(parseInt(id));
    }

    @Get('/history')
    async getUserServiceTokenHistory(
        @Req() request: Request,
        @Query('page', new DefaultValuePipe(1)) page: number,
        @Query('perPage', new DefaultValuePipe(10)) perPage: number
    ) {
        const token = request.cookies?.['user_token'];
        const customerId = await this.authService.validateUserSession(token);
        if (!customerId) {
            throw new UnauthorizedException();
        }
        return this.serviceTokensService.getUserServiceHistory(
            page,
            perPage,
            customerId
        );
    }

    @Get('/admin')
    async adminGetServiceTokens(
        @Query('page', new DefaultValuePipe(1)) page: number,
        @Query('perPage', new DefaultValuePipe(10)) perPage: number,
        @Query('plateNumber') plateNumber?: string,
        @Query('status') status?: 'USED' | 'UNUSED'
    ) {
        return this.serviceTokensService.adminGetServiceTokens(
            page,
            perPage,
            plateNumber,
            status
        );
    }
}
