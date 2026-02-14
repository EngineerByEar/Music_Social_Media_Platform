import { Express, Request, Response } from 'express';
export declare class InteractionController {
    static init(app: Express): Promise<void>;
    static add_comment(req: Request, res: Response): Promise<void>;
    static add_like(req: Request, res: Response): Promise<void>;
    static add_view(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=InteractionController.d.ts.map