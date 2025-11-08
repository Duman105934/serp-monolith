import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { CoreAppModule } from './core-app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CoreAppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, { exclude: ['docs', 'docs-json'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // выкидывает лишние поля
      forbidNonWhitelisted: false, // ругается на лишние поля
      transform: true, // преобразует payload к DTO классам
      stopAtFirstError: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  Logger.log(`Docs: http://localhost:${port}/docs`);
  Logger.log(`API : http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
