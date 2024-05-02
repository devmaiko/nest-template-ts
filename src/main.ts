import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as apm from 'elastic-apm-node';

async function bootstrap() {
  apm.start({
    serviceName: 'nest-template',
    secretToken: process.env.APM_SECRET_TOKEN,
    serverUrl: process.env.APM_SERVER_URL,
    environment: 'dev',
  });

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('NEST TEMPLATE API')
    .setDescription('The NestJS template API')
    .setVersion('1.0')
    .addTag('CRUD')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, '0.0.0.0');
  console.log(`Runnnig in port ${PORT}`);
}

bootstrap();
