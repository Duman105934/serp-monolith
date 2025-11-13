import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { CoreAppModule } from './core-app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CoreAppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // выкидывает лишние поля
      forbidNonWhitelisted: false, // ругается на лишние поля
      transform: true, // преобразует payload к DTO классам
      stopAtFirstError: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  Logger.log(`API : http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
