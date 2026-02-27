import { Server as HttpServer } from 'http';
import { IBroadcastMessage } from "../model/PageModel";
export declare class WebSocketController {
    static initWebSocket(server: HttpServer): void;
    static broadcast(message: IBroadcastMessage): void;
}
//# sourceMappingURL=WebSocketController.d.ts.map