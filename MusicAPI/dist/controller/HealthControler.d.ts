import { Express, Request, Response } from "express";
export declare class HealthControler {
    static init(app: Express): void;
    static check_health(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=HealthControler.d.ts.map