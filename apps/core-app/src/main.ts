import { NestFactory } from '@nestjs/core';
import { CoreAppModule } from './core-app.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
