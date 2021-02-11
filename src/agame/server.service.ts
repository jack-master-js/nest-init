import { Injectable } from '@nestjs/common';
import Server from '../common/Server';
import { AGamePlayer } from './player.type';

@Injectable()
export class AGameServer extends Server {
    constructor() {
        super();
    }

    playerLogin(socket) {
        const { query } = socket.handshake;
        const { loginName } = query;

        socket.loginName = loginName;

        //check user, get userInfo

        try {
            let onlinePlayer = this.onlinePlayers.get(loginName);
            let offlinePlayer = this.offlinePlayers.get(loginName);
            let player = onlinePlayer || offlinePlayer;

            if (!player) {
                //new player
                const playerInfo = {
                    loginName,
                };
                player = new AGamePlayer(socket, playerInfo);

                player.id = socket.id;

                player.onNewConnection(socket);
            } else {
                //old player
                if (onlinePlayer) {
                    this.kickOut(
                        onlinePlayer.socket,
                        'you login somewhere else.',
                    );
                    player.onKickOut(socket);
                }

                if (offlinePlayer) {
                    this.offlinePlayers.delete(loginName);
                }

                player.onReConnection(socket);
            }

            //用户上线
            player.online(socket, async () => {
                this.onlinePlayers.set(loginName, player);

                this.socketMsg(socket, 'loginRes', {
                    playerInfo: player.info,
                });
            });

            //用户下线
            player.offline(socket, async () => {
                this.onlinePlayers.delete(loginName);
                this.offlinePlayers.set(loginName, player);
            });
        } catch (e) {
            this.kickOut(socket, e.message);
        }
    }
}
