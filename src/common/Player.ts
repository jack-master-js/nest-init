export default class Player {
    public info: any;
    private socket: any;
    private handlers: any;

    constructor(socket, info) {
        this.socket = socket;
        this.info = info;

        this.handlers = new Map();
        this.handler();
    }

    on(cmd, callback) {
        this.handlers.set(cmd, callback);
    }

    emit(cmd, msg) {
        this.socket.send({ cmd, msg });
    }

    handler() {
        // playerRequests(this);
        // this.socket.onAny((event, data) => {
        //     console.log(`got ${event} data ${data}`);
        //     const { cmd, msg } = data;
        //     if (cmd) this.trigger(cmd, msg, false);
        // });
    }

    trigger(cmd, msg, fromSystem = true) {
        let handle = this.handlers.get(cmd);
        if (handle) {
            msg = msg || {};
            msg.fromSystem = fromSystem;
            handle(msg);
        }
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

    async online(socket, playerOnline) {
        await playerOnline();
        console.info(`[ Player ] ${socket.loginName} is online!`);

        this.joinRoom();
    }

    async offline(socket, playerOffline) {
        this.socket.on('disconnect', async () => {
            if (socket === this.socket) {
                await playerOffline();
                console.info(`[ Player ] ${socket.loginName} is offline!`);
            }
        });
    }

    joinRoom() {
        //to do something!!!
    }
}
