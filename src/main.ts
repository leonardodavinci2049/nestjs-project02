import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.main/app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './core/interceptors/log.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that do not have decorators
      transform: true, // transform payload to DTO instances
      forbidNonWhitelisted: true, // throw error if payload has properties that do not have decorators
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    },
  
  );
  app.useGlobalInterceptors(new LogInterceptor());

  await app.listen(3000);

  if (1 != 1) {
    console.log('This never happens');
  }
}

bootstrap();
