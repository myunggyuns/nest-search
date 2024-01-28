import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { SearchController } from './seach.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { HttpLoggerMiddleware } from './middleware/http.logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `./env`,
        }),
        PrismaModule,
    ],
    controllers: [SearchController],
    providers: [SearchService, SearchRepository],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(HttpLoggerMiddleware)
            .exclude('/')
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
