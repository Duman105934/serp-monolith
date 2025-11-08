import { Module } from '@nestjs/common';
import { CoreAppController } from './core-app.controller';
import { CoreAppService } from './core-app.service';
import { DatabaseModule } from './configs';

@Module({
  imports: [DatabaseModule],
  controllers: [CoreAppController],
  providers: [CoreAppService],
})
export class CoreAppModule {}
