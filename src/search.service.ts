import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { SearchRepository } from './search.repository';
import { SearchResponseDto } from './search.dto';

@Injectable()
export class SearchService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly searchRepository: SearchRepository,
    ) {}

    healthCheck() {
        return JSON.stringify('health check');
    }

    save(keyword: string) {
        return this.prisma.$transaction(async tx => {
            return this.searchRepository
                .increaseSearchCount(
                    await this.searchRepository.upsert(keyword, tx),
                    tx,
                )
                .then(SearchResponseDto.of);
        });
    }
}
