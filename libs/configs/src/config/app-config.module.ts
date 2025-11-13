import * as path from 'path';
import * as dotenv from 'dotenv';
import { AppConfigService } from './app-config.service';
import { Global, Module } from '@nestjs/common';

dotenv.config({
  path: path.resolve(process.cwd(), 'apps/core-app/.env'),
});

@Global() // Глобально доступен для всех сервисов
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: AppConfigService,
      useFactory: () => {
        const config = new AppConfigService();
        config.loadFromEnv();
        return config;
      },
    },
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
