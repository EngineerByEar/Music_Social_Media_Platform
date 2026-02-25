import { Express, Request, Response } from "express";
import multer from "multer";
import { Server as HttpServer } from 'http';
import { IBroadcastMessage } from "../model/PageModel";
export declare const upload: multer.Multer;
export declare class PostController {
    static init(app: Express): Promise<void>;
    static get_genres(req: Request, res: Response): void;
    static upload_post(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static update_post(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static get_post(req: Request, res: Response): Promise<void>;
    static get_comments(req: Request, res: Response): Promise<void>;
    static initWebSocket(server: HttpServer): void;
    static broadcast(message: IBroadcastMessage): void;
}
//# sourceMappingURL=PostController.d.ts.map