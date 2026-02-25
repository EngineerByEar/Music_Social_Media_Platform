import {string} from "yaml/dist/schema/common/string";
import {bool} from "sharp";
import {z} from "zod";

export const CommentRequestSchema = z.object({
    username: z.string(),
    comment: z.string(),
    post_id: z.number(),
});

export type ICommentRequest = z.infer<typeof CommentRequestSchema>;

export interface ICommentQuery{
    post_id: number;
    author_id: number;
    comment_id: number;
    comment: string;
    comment_time: string;
    username: string
}

export const LikeRequestSchema = z.object({
    post_id: z.number(),
    username: z.string(),
});

export type ILikeRequest = z.infer<typeof LikeRequestSchema>;

export const ViewRequestSchema = z.object({
    post_id: z.number(),
    username: z.string(),
    completed: z.boolean(),
    watch_time_seconds: z.number(),
});

export type IViewRequest = z.infer<typeof ViewRequestSchema>;