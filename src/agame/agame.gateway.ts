import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'ws';
import { AGameServer } from './server.service';

@WebSocketGateway()
export class AGameWsGateway implements OnGatewayInit {
    constructor(private readonly aGameServer: AGameServer) {}

    afterInit(server: Server): void {
        this.aGameServer.start(server);
    }
}