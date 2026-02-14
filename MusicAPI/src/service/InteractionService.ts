import {ICommentQuery, ICommentRequest, ILikeRequest, IViewRequest} from "../model/InteractionModel.js";
import { DB } from "../db.js";
import {ResultSetHeader} from "mysql2";
import {UserService} from "./UserService.js";

export class InteractionService {
    static async add_comment(data:ICommentRequest){
        const user_id = await UserService.getUserId(data.username);
        const [ inserted ] = await DB.execute<ResultSetHeader>(`
            INSERT INTO comments (post_id, author_id, comment, comment_time)
            VALUES(?, ?, ?, current_time())`,
            [data.post_id, user_id, data.comment]);
        return inserted.insertId;
    }

    static async get_comment(comment_id: number){
        const query = await DB.query(`
            SELECT post_id, author_id, comment_id, comment, comment_time, 
                   (Select username from users where user_id = author_id) AS username
            FROM comments
            WHERE comment_id = ${comment_id}`);

        const rows = query[0] as ICommentQuery[];
        return rows[0] as ICommentQuery;
    }

    static async check_if_liked(username: string, post_id: number) {
        const user_id = await UserService.getUserId(username);
        const query = await DB.query(`
            SELECT 1
            FROM likes
            WHERE post_id = ${post_id}
              AND user_id = ${user_id}`);
        const rows = query[0] as ILikeRequest[];
        return rows.length > 0;
    }

    static async add_like(data: ILikeRequest){
        const user_id = await UserService.getUserId(data.username);
        await DB.execute<ResultSetHeader>(`
            INSERT INTO likes (post_id, user_id, like_time)
            VALUES(?, ?, current_time())`, [data.post_id, user_id]);
    }

    static async add_view(data: IViewRequest){
        const user_id = await UserService.getUserId(data.username);

            await DB.execute<ResultSetHeader>(`
                INSERT INTO watchtime (post_id, user_id, total_watch_time_seconds, times_watched, completed, last_viewed_at)
                VALUES (?, ?, ?, 1, ?, current_time())
                ON DUPLICATE KEY UPDATE
                    total_watch_time_seconds = total_watch_time_seconds + VALUES(total_watch_time_seconds),
                    times_watched = times_watched + 1,
                    completed = completed OR VALUES(completed),
                    last_viewed_at = current_time()
                `, [data.post_id, user_id, data.watch_time_seconds, data.completed]);
    }

}