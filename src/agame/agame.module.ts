import { Module } from '@nestjs/common';
import { AGameWsGateway } from './agame.gateway';
import { AGameServer } from './server.service';

@Module({
    providers: [AGameWsGateway, AGameServer],
})
export class AGameModule {}
