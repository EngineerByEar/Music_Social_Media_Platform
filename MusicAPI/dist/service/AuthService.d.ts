import { IAuthLoginUser, IAuthRegistration } from "../model/AuthModel.js";
import { Request, Response, NextFunction } from "express";
export declare class AuthService {
    static register_user(user: IAuthRegistration): Promise<"username_conflict" | "email_conflict" | "database error" | "created">;
    static login_user(user: IAuthLoginUser): Promise<{
        message: string;
        username?: never;
        user_id?: never;
        email?: never;
    } | {
        username: string;
        user_id: number;
        email: string;
        message: string;
    }>;
    static username_from_token(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map