import { Injectable } from '@nestjs/common';
import { AGamePlayer } from './player.type';

@Injectable()
export class AGamePlayerService {
    createPlayer(socket, info) {
        return new AGamePlayer(socket, info);
    }
}
