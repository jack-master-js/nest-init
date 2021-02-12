import { Module } from '@nestjs/common';
import { AGameWsGateway } from './agame.gateway';
import { AGameServerService } from './server.service';
import { AGamePlayerService } from './player.service';

@Module({
    providers: [AGameWsGateway, AGameServerService, AGamePlayerService],
})
export class AGameModule {}
