import { Controller, Param, Post } from '@nestjs/common';
import ServiceTokensService from './service_tokens.service';

@Controller('service-tokens')
export default class ServiceTokensController {
    constructor(private readonly serviceTokensService: ServiceTokensService) {}

    @Post('/:id/used')
    async markServiceTokenUsed(@Param('id') id: string) {
        return this.serviceTokensService.markServiceTokenUsed(parseInt(id));
    }
}
