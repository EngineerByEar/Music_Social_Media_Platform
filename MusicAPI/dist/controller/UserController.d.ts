import { Express, Request, Response } from "express";
import multer from "multer";
export declare const upload: multer.Multer;
export declare class UserController {
    static init(app: Express): Promise<void>;
    static update_content_preferences(req: Request, res: Response): Promise<void>;
    static init_content_preferences(username: string): Promise<void>;
    static update_ui_settings(req: Request, res: Response): Promise<void>;
    static init_ui_settings(username: string): Promise<void>;
    static update_profile(req: Request, res: Response): Promise<void>;
    static init_profile(username: string): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map