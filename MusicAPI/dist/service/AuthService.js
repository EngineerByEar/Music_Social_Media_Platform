import { DB } from "../db.js";
import { compare, hash } from "bcrypt";
export class AuthService {
    static async register_user(user) {
        //Checking if username is already taken
        const query = await DB.query('Select `username`, `email` from `users` where `username` = ? OR `email` = ?', [user.username, user.email]);
        const rows = query[0];
        if (rows.length > 0) {
            const result = rows[0];
            // @ts-ignore
            if (result.username == user.username) {
                return "username_conflict";
            }
            // @ts-ignore
            if (result.email == user.email) {
                return "email_conflict";
            }
        }
        //hashing password
        const password = await hash(user.password, 10);
        //trying to create the new user in the database
        try {
            const [inserted] = await DB.execute('INSERT INTO `users` (`username`, `email`, `password`, `creation_time`) VALUES (?, ?, ?, current_timestamp())', [user.username, user.email, password]);
            if (inserted.affectedRows < 1)
                return "database error";
            return "created";
        }
        catch (e) {
            console.log(e);
            return "database error";
        }
    }
    static async login_user(user) {
        const query = await DB.query('Select `username`, `password`, `user_id`, `email` from `users` where `username` = ?', [user.username]);
        const rows = query[0];
        const user_data = rows[0];
        const is_valid = await compare(user.password, user_data.password);
        if (!is_valid) {
            return {
                message: "wrong_username_or_password"
            };
        }
        else {
            return {
                username: user_data.username,
                user_id: user_data.user_id,
                email: user_data.email,
                message: "confirmed"
            };
        }
    }
}
//# sourceMappingURL=AuthService.js.map