import protoUtil from '../utils/protoUtil';
export default class Server {
    onlinePlayers = new Map();
    offlinePlayers = new Map();

    //当前建立连接的用户
    socketMsg(socket, cmd, msg) {
        socket.send(protoUtil.encode(cmd, msg));
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
            socket.close();
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
