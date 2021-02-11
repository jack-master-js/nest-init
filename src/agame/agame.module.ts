import { Module } from '@nestjs/common';
import { AGameServer } from './server.service';
import { AGameWsGateway } from './agame.gateway';

@Module({
    providers: [AGameServer, AGameWsGateway],
})
export class AGameModule {}
