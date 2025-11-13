import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from '../config/app-config.service';
import { IDatabaseModuleOptions } from '@app/configs/database/db-module-options.interface';
import { AppConfigModule } from '@app/configs/config/app-config.module';
import { IDataBaseConfig } from '@app/configs/config/app-config.interface';

@Global()
@Module({})
export class DatabaseModule {
  public static forRoot(moduleOptions: IDatabaseModuleOptions) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: (
            configService: AppConfigService,
          ): TypeOrmModuleOptions => {
            return DatabaseModule.getConnectionOptions(
              configService,
              moduleOptions,
            );
          },
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }

  private static getConnectionOptions(
    configService: AppConfigService,
    moduleOptions: IDatabaseModuleOptions,
  ): TypeOrmModuleOptions {
    const dataBaseData = configService.get().database;
    const envData = configService.get().env;
    if (!dataBaseData) {
      throw Error('No database configs');
    }
    const connectionOptions = this.getConnectionOptionsPostgres(
      envData,
      dataBaseData,
    );
    return {
      ...connectionOptions,
      entities: moduleOptions.entities,
    };
  }

  private static getConnectionOptionsPostgres(
    envData: string,
    _dataBaseData: IDataBaseConfig,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: _dataBaseData.url,
      schema: 'core', // Если в entity нет схемы уйдет сюда
      synchronize: true, // в PROD среде всегда false
      logging: false,
      autoLoadEntities: true,
      dropSchema: false,
      ssl:
        envData !== 'local' && envData !== 'test'
          ? { rejectUnauthorized: false }
          : false,
    };
  }
}
