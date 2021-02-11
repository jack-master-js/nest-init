export default function playerRequest(player) {
    player.on('ping', (msg) => {
        console.info(msg);
        player.emit('pong', {
            clientTime: msg.clientTime,
            serverTime: Date.now(),
        });
    });
}
