import {ICommentQuery, ICommentRequest} from "../model/InteractionModel.js";
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
}