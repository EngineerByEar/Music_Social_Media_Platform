import { Express, Request, Response } from 'express';
export declare class UserActionController {
    static init(app: Express): void;
    static follow_user(req: Request, res: Response): Promise<void>;
    static unfollow_user(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=UserActionController.d.ts.map