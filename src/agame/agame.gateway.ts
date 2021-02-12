import {
    WebSocketGateway,
    OnGatewayInit,
    SubscribeMessage,
    WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AGameServerService } from './server.service';

@WebSocketGateway()
export class AGameWsGateway implements OnGatewayInit {
    constructor(private readonly aGameServerService: AGameServerService) {}

    afterInit(server: Server): void {
        this.aGameServerService.listen(server);
    }

    @SubscribeMessage('events')
    onEvent(client: any, data: any): Observable<WsResponse<number>> {
        console.log(data);

        return from([1, 2, 3]).pipe(
            map((item) => ({ event: 'events', data: item })),
        );
    }
}
