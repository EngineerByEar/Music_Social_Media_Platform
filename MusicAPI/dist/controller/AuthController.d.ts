import { Express, Request, Response } from 'express';
export declare class AuthController {
    static init(app: Express): Promise<void>;
    static register(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map