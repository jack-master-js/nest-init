export default class Server {
    server: any;
    onlinePlayers = new Map();
    offlinePlayers = new Map();

    async start(server) {
        this.server = server;
        this.server.on('connection', (socket) => {
            // distribute the user from different path
            this.playerLogin(socket);
        });
    }

    playerLogin(socket) {}

    //当前建立连接的用户
    socketMsg(socket, cmd, msg) {
        socket.send({ cmd, msg });
    }

    //所有用户
    broadMsg(cmd, msg) {
        this.onlinePlayers.forEach((player) => {
            player.emit(cmd, msg);
        });
    }

    checkOnline(loginName) {
        return this.onlinePlayers.get(loginName);
    }

    kickOut(socket, message) {
        if (socket) {
            this.socketMsg(socket, 'systemNotice', { message });
            socket.disconnect();
        }
    }

    kickOutAll(msg) {
        this.onlinePlayers.forEach((player) => {
            this.kickOut(player.socket, msg);
        });
    }

    async close() {
        console.error(`[game server] gameServer is closed.`);
    }
}
