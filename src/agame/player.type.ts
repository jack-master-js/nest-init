import Player from '../common/Player';
import playerRequests from './player.requests';

export class AGamePlayer extends Player {
    constructor(socket, info) {
        super(socket, info);
    }

    handler() {
        playerRequests(this);
    }
}
