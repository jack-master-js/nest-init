import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AGameModule } from './agame/agame.module';

@Module({
    imports: [AGameModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: 'myValue',
        useValue: 666
    }],
})
export class AppModule {}
