import { UserService } from "./UserService.js";
import { DB } from "../db.js";
export class PostService {
    static async createPost(data) {
        const user_id = await UserService.getUserId(data.username);
        const [inserted] = await DB.execute('Insert into `posts` (`author_id`, `post_title`, `post_description`, `post_upload_time`) values (?, ?, ?, current_time())', [user_id, data.post_title, data.post_description]);
        return inserted.insertId;
    }
    static async add_post_files(post_id, audio_path, image_path, prev_path) {
        await DB.execute('Insert into `postfiles` (`post_id`, `post_image_url`, `post_preview_image_url`, `post_audio_url`) values (?, ?, ?, ?)', [post_id, image_path, prev_path, audio_path]);
    }
    static async add_post_genres(post_id, audio_genres) {
        for (const genre of audio_genres) {
            await DB.execute(`
                INSERT INTO postaudiogenres
                (post_id, audio_genre)
                VALUES(?, ?)`, [post_id, genre]);
        }
    }
    static async add_post_tags(post_id, post_tags) {
        for (const tag of post_tags) {
            await DB.execute(`
            INSERT INTO posttags(post_id, tag)
            VALUES(?, ?)`, [post_id, tag]);
        }
    }
    static async validate_author(post_id, username) {
        const user_id = await UserService.getUserId(username);
        const query = await DB.execute(`
            SELECT author_id
            FROM posts
            WHERE post_id = ?`, [post_id]);
        const rows = query[0];
        const row = rows[0];
        return row.author_id === user_id;
    }
    static async update_post(data) {
        await DB.execute(`
            UPDATE posts
            SET post_title = COALESCE(?, post_title),
                post_description = COALESCE(?, post_description)
            WHERE post_id = ?`, [data.post_title ?? null, data.post_description ?? null, data.post_id]);
    }
    ;
    static async update_post_genres(post_id, audio_genres) {
        await DB.execute(`DELETE FROM postaudiogenres WHERE post_id = ?`, [post_id]);
        await PostService.add_post_genres(post_id, audio_genres);
    }
    static async update_post_tags(post_id, post_tags) {
        await DB.execute(`DELETE FROM posttags WHERE post_id = ?`, [post_id]);
        await PostService.add_post_tags(post_id, post_tags);
    }
    static async get_post(post_id) {
        const query = await DB.execute(`Select
                    p.post_title,
                    p.post_description,
                    p.post_id,
                    pf.post_audio_url,
                    pf.post_image_url,
                    (select count(*) from watchtime w where w.post_id = p.post_id) as post_views_count,
                    (select count(*) from likes l where l.post_id = p.post_id) as post_likes_count,
                    (select count(*) from comments c where c.post_id = p.post_id) as post_comments_count,
                    GROUP_CONCAT( DISTINCT pag.audio_genre) as post_audio_genres,
                    GROUP_CONCAT(DISTINCT pt.tag) as post_tags
                from posts p
                left join postfiles pf on p.post_id = pf.post_id
                left join postaudiogenres pag on pag.post_id = p.post_id
                left join posttags pt on pt.post_id = p.post_id
                left join watchtime w on w.post_id = p.post_id
                where p.post_id = ?
                GROUP BY p.post_id`, [post_id]);
        if (query.length < 1) {
            return "post_not_found";
        }
        const rows = query[0];
        const row = rows[0];
        //Converting Group_Concat to array
        return {
            ...row,
            post_audio_genres: row.post_audio_genres
                ? row.post_audio_genres.split(",")
                : [],
            post_tags: row.post_tags
                ? row.post_tags.split(",")
                : []
        };
    }
    static async get_all_comments(post_id) {
        const query = await DB.query(`
            SELECT u.username, c.comment, c.comment_time 
            FROM comments c
            left join users u
                on c.author_id = u.user_id
            WHERE post_id = ${post_id}
            ORDER BY comment_time DESC`);
        return query[0];
    }
}
//# sourceMappingURL=PostService.js.map