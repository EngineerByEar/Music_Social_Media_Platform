import { z } from "zod";
export const CommentRequestSchema = z.object({
    username: z.string(),
    comment: z.string(),
    post_id: z.number(),
});
export const LikeRequestSchema = z.object({
    post_id: z.number(),
    username: z.string(),
});
export const ViewRequestSchema = z.object({
    post_id: z.number(),
    username: z.string(),
    completed: z.boolean(),
    watch_time_seconds: z.number(),
});
//# sourceMappingURL=InteractionModel.js.map