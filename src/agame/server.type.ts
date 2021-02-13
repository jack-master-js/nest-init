import Server from '../types/server';
import { netUtil } from 'web-base';
import { v4 } from 'uuid';
import * as qs from 'qs';
import { AGamePlayer } from './player.type';

const uuidv4 = v4;

export class AGameServer extends Server {
    server: any;

    constructor() {
        super();
    }

    async start(server) {
        this.server = server;
        this.server.on('connection', (socket, req) => {
            console.info(
                `[game server] connection origin: ${req.headers.origin}`,
            );
            console.info(`[game server] connection url: ${req.url}`);

            socket.on('error', (e) => {
                console.error(
                    `[game server] ${socket.loginName} socket error: ${e.message}`,
                );
            });

            // distribute the user from different path
            const ip = netUtil.getWsClientIp(req);
            const queryStr = netUtil.getQueryStr(req.url);
            const query = qs.parse(queryStr);
            const { loginName } = query;

            if (loginName) {
                socket.loginName = loginName;
                socket.ip = ip;
                this.playerLogin(socket);
            }
        });
    }

    playerLogin(socket) {
        const { loginName, ip } = socket;
        //check user, get userInfo
        try {
            let onlinePlayer = this.onlinePlayers.get(loginName);
            let offlinePlayer = this.offlinePlayers.get(loginName);
            let player = onlinePlayer || offlinePlayer;

            if (!player) {
                //new player
                const playerInfo = {
                    loginName,
                    ip,
                };

                player = new AGamePlayer(socket, playerInfo, uuidv4());
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
