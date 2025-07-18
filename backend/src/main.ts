import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from '@common/exceptions/all-exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

import { promises as fs } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Apartments API')
    .setDescription('API for apartment listing app')
    .setVersion('1.0')
    .addTag('Apartments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(4000);
}

async function ensureUploadDir() {
  const uploadPath = join(process.cwd(), 'uploads', 'apartments');
  try {
    await fs.mkdir(uploadPath, { recursive: true });
  } catch (error) {
    console.error('Failed to create upload directory', error);
  }
}

ensureUploadDir()
  .then(() => console.log('Upload directory created'))
  .catch(() => console.error('Failed to create upload directory'));

bootstrap()
  .then(() => console.log('Server running on port 3000'))
  .catch((err) => console.error(err));
