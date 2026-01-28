import { DB } from "../db.js";
export class UserService {
    static async getUserId(username) {
        const query = await DB.query('Select `user_id` from `users`where `username` = ?', [username]);
        const rows = query[0];
        const result = rows[0];
        if (rows.length === 0) {
            return undefined;
        }
        else {
            return result.user_id;
        }
    }
}
//# sourceMappingURL=UserService.js.map