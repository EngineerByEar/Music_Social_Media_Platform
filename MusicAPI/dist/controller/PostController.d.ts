import { Express, Request, Response } from "express";
import multer from "multer";
export declare const upload: multer.Multer;
export declare class PostController {
    static init(app: Express): Promise<void>;
    static upload_post(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=PostController.d.ts.map