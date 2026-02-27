import { WebSocketServer } from "ws";
let wss;
const subscriptions = {};
export class WebSocketController {
    static initWebSocket(server) {
        wss = new WebSocketServer({ server });
        wss.on('connection', (ws) => {
            ws.on('message', (msg) => {
                let data = JSON.parse(msg);
                if (data.type === 'subscribe' && data.post_id) {
                    if (!subscriptions[data.post_id]) {
                        subscriptions[data.post_id] = new Set();
                        subscriptions[data.post_id].add(ws);
                    }
                }
                else if (data.type === 'unsubscribe' && data.post_id) {
                    subscriptions[data.post_id]?.delete(ws);
                }
            });
            ws.on('close', () => {
                Object.values(subscriptions).forEach(set => set.delete(ws));
            });
        });
    }
    ;
    static broadcast(message) {
        console.log("Broadcast");
        console.log(message);
        const postSubs = subscriptions[message.post_id];
        if (!postSubs) {
            return;
        }
        const msg = JSON.stringify(message);
        postSubs.forEach(ws => ws.send(msg));
    }
}
//# sourceMappingURL=WebSocketController.js.map