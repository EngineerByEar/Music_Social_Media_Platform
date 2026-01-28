export interface ICreatePostRequest {
    post_title: string;
    post_description: string;
    post_tags?: string[];
    post_audio_genre: string[];
    username: string;
}
export interface IPostResponse {
    post_title: string;
    post_description: string;
    post_id: number;
    post_audio_url: string;
    post_image_url: string;
    post_likes_count: number;
    post_comments_count: number;
}
//# sourceMappingURL=PostModel.d.ts.map