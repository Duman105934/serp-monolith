import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseFactory } from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (!configService) throw new Error('No database configs');
        return DatabaseFactory.createDatabaseConnection(configService);
      },
    }),
  ],
})
export class DatabaseModule {}
