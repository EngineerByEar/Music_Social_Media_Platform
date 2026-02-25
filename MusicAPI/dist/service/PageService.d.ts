import { IHistoryQuery, IPostsQuery } from "../model/PageModel.js";
export declare class PageService {
    static load_profile(profile_id: number, requesting_username: string | undefined): Promise<{
        user_is_following: boolean;
        post_previews: IPostsQuery[];
        username: string;
        profile_description: string;
        profile_image_url: string;
        profile_image_preview_url: string;
        constructor: {
            name: "RowDataPacket";
        };
    }>;
    static load_history(user_id: number): Promise<IHistoryQuery[]>;
}
//# sourceMappingURL=PageService.d.ts.map