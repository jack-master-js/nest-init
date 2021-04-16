import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
//Client --->Middleware--->Guard--->Interceptor Req--->Pipe--->Controller--->Interceptor Res--->Filter
// import bootstrapMicro from './micro/index'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  let port = process.env.PORT || 3000
  await app.listen(port);
  console.log(`Application is listening on ${port}`);
}

bootstrap();
// bootstrapMicro()
