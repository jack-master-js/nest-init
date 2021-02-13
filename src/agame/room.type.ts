import { AGamePlayer } from './player.type';
export class AGameRoom {
    players: any = new Map();

    constructor() {}

    addPlayer(player: AGamePlayer) {
        this.players.set(player.id, player);
    }
}
