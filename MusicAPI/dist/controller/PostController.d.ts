import { Express, Request, Response } from "express";
import multer from "multer";
export declare const upload: multer.Multer;
export declare class PostController {
    static init(app: Express): Promise<void>;
    static upload_post(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static update_post(req: Request, res: Response): Promise<void>;
    static get_post(req: Request, res: Response): Promise<void>;
    static get_comments(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=PostController.d.ts.map