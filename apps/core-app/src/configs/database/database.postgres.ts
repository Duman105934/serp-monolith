import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from '../config/app-config.service';

export class PostgresDatabase {
  constructor(private readonly configService: AppConfigService) {}

  getConnection(): TypeOrmModuleOptions {
    return {
      type: this.configService.get().database.type,
      host: this.configService.get().database.host,
      port: this.configService.get().database.port,
      username: this.configService.get().database.username,
      password: this.configService.get().database.password,
      database: this.configService.get().database.database,
      synchronize: false, // в PROD среде всегда false
      autoLoadEntities: true,
      logging: false,
      dropSchema: false,
    };
  }
}
