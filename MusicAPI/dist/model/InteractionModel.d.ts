import { z } from "zod";
export declare const CommentRequestSchema: z.ZodObject<{
    username: z.ZodString;
    comment: z.ZodString;
    post_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    post_id: number;
    comment: string;
}, {
    username: string;
    post_id: number;
    comment: string;
}>;
export type ICommentRequest = z.infer<typeof CommentRequestSchema>;
export interface ICommentQuery {
    post_id: number;
    author_id: number;
    comment_id: number;
    comment: string;
    comment_time: string;
    username: string;
}
export declare const LikeRequestSchema: z.ZodObject<{
    post_id: z.ZodNumber;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    post_id: number;
}, {
    username: string;
    post_id: number;
}>;
export type ILikeRequest = z.infer<typeof LikeRequestSchema>;
export declare const ViewRequestSchema: z.ZodObject<{
    post_id: z.ZodNumber;
    username: z.ZodString;
    completed: z.ZodBoolean;
    watch_time_seconds: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    post_id: number;
    completed: boolean;
    watch_time_seconds: number;
}, {
    username: string;
    post_id: number;
    completed: boolean;
    watch_time_seconds: number;
}>;
export type IViewRequest = z.infer<typeof ViewRequestSchema>;
//# sourceMappingURL=InteractionModel.d.ts.map