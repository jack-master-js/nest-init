import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AGameModule } from './agame/agame.module';

@Module({
    imports: [AGameModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
