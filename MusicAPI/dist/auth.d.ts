import { NextFunction, Request, Response } from "express";
import "dotenv/config";
export interface ITokenPayload {
    username: string;
}
export declare function generateToken(payload: ITokenPayload): string;
export declare function validateAuth(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map