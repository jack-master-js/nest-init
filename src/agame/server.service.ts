import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { AGameServer } from './server.type';
import { AGamePlayerService } from './player.service';

@Injectable()
export class AGameServerService {
    constructor(private readonly aGamePlayerService: AGamePlayerService) {}

    listen(server: Server) {
        const aGameServer = new AGameServer();
        aGameServer.start(server);
    }
}
