import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { CoreAppModule } from './core-app.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreAppModule);
  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
