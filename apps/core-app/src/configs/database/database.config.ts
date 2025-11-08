import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresDatabase } from './database.postgres';

export class DatabaseFactory {
  static createDatabaseConnection(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return new PostgresDatabase(configService).getConnection();
  }
}
