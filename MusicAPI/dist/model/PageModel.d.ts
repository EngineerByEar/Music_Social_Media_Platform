import { RowDataPacket } from "mysql2";
export interface IProfileDataQuery extends RowDataPacket {
    username: string;
    profile_description: string;
    profile_image_url: string;
    profile_image_preview_url: string;
}
export interface IPostsQuery extends RowDataPacket {
    post_id: number;
    post_title: string;
    post_author_username: string;
    post_preview_image_url: string;
    post_audio_url: string;
    post_views_count: number;
    post_likes_count: number;
}
export interface IHistoryQuery extends RowDataPacket {
    post_id: number;
    post_title: string;
    post_author_username: string;
    post_preview_image_url: string;
    post_audio_url: string;
    post_views_count: number;
    post_likes_count: number;
    viewed_at: Date;
}
//# sourceMappingURL=PageModel.d.ts.map