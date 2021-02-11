import protoUtil from '../utils/protoUtil';
export default class Player {
    socket: any;
    info: any;
    handlers: any = new Map();

    constructor(socket, info) {
        this.socket = socket;
        this.info = info;
    }

    on(cmd, callback) {
        this.handlers.set(cmd, callback);
    }

    emit(cmd, msg) {
        this.socket.send(protoUtil.encode(cmd, msg));
    }

    trigger(cmd, msg, fromSystem = true) {
        let handle = this.handlers.get(cmd);
        if (handle) {
            msg = msg || {};
            msg.fromSystem = fromSystem;
            handle(msg);
        }
    }

    async online(socket, playerOnline) {
        await playerOnline();
        console.info(`[ Player ] ${socket.loginName} is online!`);
    }

    async offline(socket, playerOffline) {
        this.socket.on('disconnect', async () => {
            if (socket === this.socket) {
                await playerOffline();
                console.info(`[ Player ] ${socket.loginName} is offline!`);
            }
        });
    }
}
