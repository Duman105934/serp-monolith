import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/configs';

@Module({
  imports: [AppConfigModule],
  providers: [],
  exports: [],
})
export class CommonModule {}
