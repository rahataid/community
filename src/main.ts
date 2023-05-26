// src/main.ts

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from 'src/config';
import { ValidationPipe } from 'src/utils/pipes/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Community Api')
    .setDescription('Rahat Communities')
    .setVersion('0.1')
    .setBasePath('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  console.log(`Listening on port ${PORT}...`);
  console.log(`Swagger UI: http://localhost:${PORT}/api/docs`);

  await app.listen(PORT);
}
bootstrap();
