import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', { infer: true });

  app.setGlobalPrefix(
    `api/${configService.get<string>('APP_VERSION', { infer: true })}`,
  );
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  await app.listen(port);

  console.log(
    `App running on: http://localhost:${port}/api/${configService.get<string>('APP_VERSION', { infer: true })}`,
  );
}

bootstrap();
