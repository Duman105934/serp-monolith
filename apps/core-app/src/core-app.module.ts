import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs';
import { AppConfigModule } from './configs';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class CoreAppModule {}
