import { z } from "zod";
export declare const FollowSchema: z.ZodObject<{
    user_following: z.ZodString;
    user_followed: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_following: string;
    user_followed: string;
}, {
    user_following: string;
    user_followed: string;
}>;
export type IFollow = z.infer<typeof FollowSchema>;
//# sourceMappingURL=UserActionModel.d.ts.map