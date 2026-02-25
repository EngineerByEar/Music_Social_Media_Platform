import { RowDataPacket } from "mysql2";
export interface IRecommendationQuery extends RowDataPacket {
    post_id: number;
    post_title: string;
    post_author_username: string;
    post_preview_image_url: string;
    post_audio_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_waveform: Buffer;
}
export interface IRecommendation {
    post_id: number;
    post_title: string;
    post_author_username: string;
    post_preview_image_url: string;
    post_audio_url: string;
    post_views_count: number;
    post_likes_count: number;
    post_waveform: string;
}
export interface IRecommendationIdQuery extends RowDataPacket {
    post_id: number;
}
export interface IUserRecommendation {
    post_id: number;
    post_title: string;
    post_author_username: string;
    post_preview_image_url: string;
    post_audio_url: string;
    post_views_count: number;
    post_likes_count: number;
    user_has_liked: boolean;
    post_waveform: string;
}
//# sourceMappingURL=RecommendationModel.d.ts.map