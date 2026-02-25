import { z } from "zod";
export const FollowSchema = z.object({
    user_following: z.string(),
    user_followed: z.string(),
});
//# sourceMappingURL=UserActionModel.js.map