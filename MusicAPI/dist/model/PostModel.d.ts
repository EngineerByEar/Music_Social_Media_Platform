import { RowDataPacket } from "mysql2";
import { z } from "zod";
export declare const CreatePostRequestSchema: z.ZodObject<{
    post_title: z.ZodString;
    post_description: z.ZodString;
    post_tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    post_audio_genres: z.ZodArray<z.ZodString, "many">;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    post_title: string;
    post_description: string;
    post_audio_genres: string[];
    post_tags?: string[] | undefined;
}, {
    username: string;
    post_title: string;
    post_description: string;
    post_audio_genres: string[];
    post_tags?: string[] | undefined;
}>;
export type ICreatePostRequest = z.infer<typeof CreatePostRequestSchema>;
export interface IPostResponse {
    post_title: string;
    post_description: string;
    post_id: number;
    post_author_username: string;
    post_audio_url: string;
    post_image_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_comments_count: number;
    post_tags?: string[];
    post_audio_genres: string[];
    post_waveform: string;
    user_has_liked: boolean;
}
export interface IPostQuery {
    post_title: string;
    post_description: string;
    post_id: number;
    post_author_username: string;
    post_audio_url: string;
    post_image_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_comments_count: number;
    post_tags?: string;
    post_audio_genres: string;
    post_waveform: Buffer;
}
export declare const PostPatchRequestSchema: z.ZodObject<{
    post_title: z.ZodOptional<z.ZodString>;
    post_description: z.ZodOptional<z.ZodString>;
    post_tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    post_audio_genres: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    username: z.ZodString;
    post_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    post_id: number;
    post_title?: string | undefined;
    post_description?: string | undefined;
    post_tags?: string[] | undefined;
    post_audio_genres?: string[] | undefined;
}, {
    username: string;
    post_id: number;
    post_title?: string | undefined;
    post_description?: string | undefined;
    post_tags?: string[] | undefined;
    post_audio_genres?: string[] | undefined;
}>;
export type IPostPatchRequest = z.infer<typeof PostPatchRequestSchema>;
export interface ICommentResponse {
    username: string;
    comment: string;
    comment_time: string;
}
export interface IWaveform extends RowDataPacket {
    waveform: Buffer;
}
//# sourceMappingURL=PostModel.d.ts.map