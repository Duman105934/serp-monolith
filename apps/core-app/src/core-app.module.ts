import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '../.env'),
        join(process.cwd(), 'apps/core-app/.env'),
      ],
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreAppModule {}
