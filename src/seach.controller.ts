import { Controller, Post, Body, Get } from '@nestjs/common';

import { SearchService } from './search.service';
import { SearchRequestDto } from './search.dto';
import Logger from './support/logger';

@Controller('search')
export class SearchController {
    logger: Logger;
    constructor(private readonly appService: SearchService) {
        this.logger = new Logger('search');
    }

    @Get()
    sendError() {
        // this.logger.error('error logger test');
        // return new Error('error logger test');
        return this.appService.healthCheck();
    }

    @Post()
    search(@Body() { keyword }: SearchRequestDto) {
        return this.appService.save(keyword);
    }
}
