import { Express, Request, Response } from "express";
export declare class HealthController {
    static init(app: Express): void;
    static check_health(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=HealthController.d.ts.map