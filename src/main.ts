import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//Client --->Middleware--->Guard--->Interceptor Before--->Pipe--->Controller--->Interceptor After--->Filter
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
