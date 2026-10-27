import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { swaggerConfig } from './config/swagger.config.js';
import { ResponseInterceptor } from './custom/interceptor/response.interceptor.js';
import { HttpExceptionFilter } from './custom/exception/http.exception.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet.default());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.useGlobalInterceptors(new ResponseInterceptor());

  swaggerConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
