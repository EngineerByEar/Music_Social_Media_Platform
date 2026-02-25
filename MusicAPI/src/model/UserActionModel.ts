import { z } from "zod";

export const FollowSchema = z.object({
    user_following: z.string(),
    user_followed: z.string(),
});

export type IFollow = z.infer<typeof FollowSchema>;