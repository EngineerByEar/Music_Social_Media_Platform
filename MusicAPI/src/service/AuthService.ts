import {
    IAuthLoginQuery,
    IAuthLoginResponse,
    IAuthLoginUser,
    IAuthRegistration,
    IAuthRegistrationCheck
} from "../model/AuthModel.js";
import {DB} from "../db.js"
import {compare, hash} from "bcrypt";
import {ResultSetHeader} from "mysql2";


export class AuthService {

    static async register_user(user: IAuthRegistration){

        //Checking if username is already taken
        const query = await DB.query('Select `username`, `email` from `users` where `username` = ? OR `email` = ?', [user.username, user.email]);
        const rows = query[0] as IAuthRegistrationCheck[];
        if(rows.length > 0){
            const result = rows[0];
            console.log(result);
            // @ts-ignore
            if(result.username == user.username){
                return "username_conflict";
            }
            // @ts-ignore
            if(result.email == user.email){
                return "email_conflict";
            }
        }


        //hashing password
        const password = await hash(user.password, 10);

        //trying to create the new user in the database
        try {
            const [ inserted ] = await DB.execute<ResultSetHeader>('INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `creation_time`) VALUES (NULL, ?, ?, ?, current_timestamp())', [user.username, user.email, password]);
            if(inserted.affectedRows < 1) return "database error";
            return "created";
        }catch(e){
            console.log(e);
            return "database error";
        }
    }

    static async login_user(user: IAuthLoginUser) {

        const query = await DB.query('Select `username`, `password`, `user_id`, `email` from `users` where `username` = ?', [user.username]);
        const rows = query[0] as IAuthLoginQuery[];
        const user_data = rows[0] as IAuthLoginQuery;
        const is_valid = compare(user.password, user_data.password);

        if(!is_valid) {
            return {
                message: "wrong_username_or_password"

            };
        } else {
            return {
                username: user_data.username,
                user_id: user_data.user_id,
                email: user_data.email,
                message: "confirmed"
            };
        }
    }

}