import { Global, Module } from '@nestjs/common';
import { DatabaseFactory } from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/app-config.module';
import { AppConfigService } from '../config/app-config.service';

@Global()
@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        if (!configService) throw new Error('No database configs');
        return DatabaseFactory.createDatabaseConnection(configService);
      },
    }),
  ],
})
export class DatabaseModule {}
