import { IFollow } from "../model/UserActionModel.js";
export declare class UserActionService {
    static follow_user(data: IFollow): Promise<"CANNOT_FOLLOW_SELF" | "USER_DOES_NOT_EXIST" | "ALREADY_FOLLOWING" | "SUCCESS">;
    static unfollow_user(data: IFollow): Promise<"USER_DOES_NOT_EXIST" | "SUCCESS" | "CANNOT_UNFOLLOW_SELF" | "NOT_FOLLOWING">;
}
//# sourceMappingURL=UserActionService.d.ts.map