import { DB } from "../db.js";
export class RecommendationService {
    static async get_guest_recommendations() {
        const query = await DB.query(`SELECT p.post_id, p.post_title, u.username as post_author_username, pf.post_preview_image_url, pf.post_audio_url, count(w.post_id) as post_views_count, count(l.post_id) as post_likes_count
           FROM posts p
           LEFT JOIN users u ON p.author_id = u.user_id
           LEFT JOIN postfiles pf ON p.post_id = pf.post_id
           LEFT JOIN likes l on p.post_id = l.post_id
           left join watchtime w on p.post_id = w.post_id
           GROUP BY p.post_id
           ORDER BY post_likes_count DESC LIMIT 10`);
        return query[0];
    }
}
//# sourceMappingURL=RecommendationService.js.map