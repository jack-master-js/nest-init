import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
    // {
    //   transport: Transport.REDIS,
    //   options: {
    //     url: 'redis://:root@localhost:16379',
    //   },
    // },
  );
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap()
// export default bootstrap