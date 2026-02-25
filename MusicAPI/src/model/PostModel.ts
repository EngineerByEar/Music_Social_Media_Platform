import { RowDataPacket } from "mysql2";
import {z } from "zod";

export const CreatePostRequestSchema = z.object({
    post_title: z.string(),
    post_description: z.string(),
    post_tags: z.array(z.string()).optional(),
    post_audio_genres: z.array(z.string()),
    username: z.string(),
});

export type ICreatePostRequest = z.infer<typeof CreatePostRequestSchema>;

export interface IPostResponse{
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

export interface IPostQuery{
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

export const PostPatchRequestSchema = z.object({
    post_title: z.string().optional(),
    post_description: z.string().optional(),
    post_tags: z.array(z.string()).optional(),
    post_audio_genres: z.array(z.string()).optional(),
    username: z.string(),
    post_id: z.number(),
});

export type IPostPatchRequest = z.infer<typeof PostPatchRequestSchema>;

export interface ICommentResponse{
    username: string;
    comment: string;
    comment_time: string;
}

export interface IWaveform extends RowDataPacket{
    waveform: Buffer;
}

