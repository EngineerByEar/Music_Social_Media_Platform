export interface ICreatePostRequest {
    post_title: string;
    post_description: string;
    post_tags?: string[];
    post_audio_genres: string[];
    username: string;
}
export interface IPostResponse {
    post_title: string;
    post_description: string;
    post_id: number;
    post_audio_url: string;
    post_image_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_comments_count: number;
    post_tags?: string[];
    post_audio_genres: string[];
}
export interface IPostQuery {
    post_title: string;
    post_description: string;
    post_id: number;
    post_audio_url: string;
    post_image_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_comments_count: number;
    post_tags?: string;
    post_audio_genres: string;
}
export interface ICommentResponse {
    username: string;
    comment: string;
    comment_time: string;
}
//# sourceMappingURL=PostModel.d.ts.map