import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs.service';

const configFactory = {
  provide: ConfigService,
  useFactory: () => new ConfigService(),
};

@Global() // Глобально доступен для всех сервисов
@Module({
  imports: [],
  controllers: [],
  providers: [configFactory],
  exports: [configFactory],
})
export class ConfigModule {}
