import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { Logger as PinoLogger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { cors } from '@common/constants/cors';
import { Kernel } from './app/kernel';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useLogger(app.get(PinoLogger));
  app.useGlobalPipes(new ValidationPipe(Kernel.validationPipeConfig));
  app.enableShutdownHooks();
  app.enableCors(cors);
  app.setGlobalPrefix('api/v1');

  await new Kernel(app).createORMConfigJSON().generateSwaggerDoc().boot();

}

bootstrap();
