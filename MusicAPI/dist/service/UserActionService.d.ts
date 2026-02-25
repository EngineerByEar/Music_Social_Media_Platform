import { IFollow } from "../model/UserActionModel.js";
export declare class UserActionService {
    static check_if_following(requesting_user_id: number, profile_id: number): Promise<boolean>;
    static follow_user(data: IFollow): Promise<"CANNOT_FOLLOW_SELF" | "USER_DOES_NOT_EXIST" | "ALREADY_FOLLOWING" | "SUCCESS">;
    static unfollow_user(data: IFollow): Promise<"USER_DOES_NOT_EXIST" | "SUCCESS" | "CANNOT_UNFOLLOW_SELF" | "NOT_FOLLOWING">;
}
//# sourceMappingURL=UserActionService.d.ts.map