import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
