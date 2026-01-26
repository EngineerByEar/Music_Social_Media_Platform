import { IUserRegistration } from "../model/UserModel.js";
export declare class UserService {
    static register_user(user: IUserRegistration): Promise<"username_conflict" | "email_conflict" | "database error" | "created">;
}
//# sourceMappingURL=UserService.d.ts.map