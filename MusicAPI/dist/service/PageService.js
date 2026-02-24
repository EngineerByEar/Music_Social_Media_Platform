import { DB } from "../db.js";
import { UserService } from "./UserService.js";
import { UserActionService } from "./UserActionService.js";
export class PageService {
    static async load_profile(profile_id, requesting_username) {
        const [profile_data_rows] = await DB.query(`
            Select u.username,
                   pr.profile_description,
                   pr.profile_picture_url as profile_image_url,
                   pr.preview_profile_picture_url as profile_image_preview_url
            from profile pr
            left join users u on u.user_id = pr.user_id
            Where u.user_id = ?
            `, [profile_id]);
        const profile_data = profile_data_rows[0];
        const [post_previews] = await DB.query(`
            Select p.post_id,
                   p.post_title,
                   u.username as post_author_username,
                   pf.post_preview_image_url, 
                   pf.post_audio_url,
                   (SELECT count(*) from watchtime w where w.post_id = p.post_id) as post_views_count,
                   (SELECT count(*) from likes l where l.post_id = p.post_id) as post_likes_count                   
            FROM posts p
            left join users u on u.user_id = p.author_id
            left join postfiles pf on p.post_id = pf.post_id
            Where p.author_id = ?
        `, [profile_id]);
        let user_is_following = false;
        if (requesting_username) {
            const requesting_user_id = await UserService.getUserId(requesting_username);
            if (requesting_user_id && await UserActionService.check_if_following(requesting_user_id, profile_id)) {
                user_is_following = true;
            }
        }
        return {
            ...profile_data,
            user_is_following,
            post_previews
        };
    }
    static async load_history(user_id) {
        const [history] = await DB.query(`
            SELECT p.post_id,
                   p.post_title,
                   u.username as post_author_username,
                   pf.post_preview_image_url,
                   pf.post_audio_url,
                   (SELECT count(*) from watchtime w where w.post_id = p.post_id) as post_views_count,
                   (SELECT count(*) from likes l where l.post_id = p.post_id) as post_likes_count,
                   last_viewed_at as viewed_at 
            FROM posts p 
            left join users u on p.author_id = u.user_id
            left join watchtime w on w.post_id = p.post_id
            left join postfiles pf on pf.post_id = w.post_id
            WHERE w.user_id = ?
            ORDER BY viewed_at DESC`, [user_id]);
        return history;
    }
}
//# sourceMappingURL=PageService.js.map