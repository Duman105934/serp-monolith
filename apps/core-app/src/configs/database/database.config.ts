import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresDatabase } from './database.postgres';
import { AppConfigService } from '../config/app-config.service';

export class DatabaseFactory {
  static createDatabaseConnection(
    configService: AppConfigService,
  ): TypeOrmModuleOptions {
    return new PostgresDatabase(configService).getConnection();
  }
}
