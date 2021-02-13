import Player from '../types/player';
import playerRequests from './player.requests';
import protoUtil from '../utils/protoUtil';

export class AGamePlayer extends Player {
    id: string;
    constructor(socket, info, id) {
        super(socket, info);
        this.id = id;
        this.handler();
    }

    handler() {
        playerRequests(this);
        this.socket.on('message', (data) => {
            const { cmd, msg } = protoUtil.decode(data);
            if (cmd) this.trigger(cmd, msg, false);
        });
    }

    onNewConnection(socket) {
        console.info(`[ Player ] ${socket.loginName} new connected!`);
    }

    onReConnection(socket) {
        console.info(`[ Player ] ${socket.loginName} reconnected!`);
        this.socket = socket;
        this.handler();
    }

    onKickOut(socket) {
        console.info(`[ Player ] ${socket.loginName} was kick out!`);
    }
}
