import { IAuthLoginUser, IAuthRegistration } from "../model/AuthModel.js";
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
}
//# sourceMappingURL=AuthService.d.ts.map