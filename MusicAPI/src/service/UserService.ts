import {DB} from "../db.js";
import {ResultSetHeader} from "mysql2";


export interface IUserIdRow{
    user_id: number;
}

export class UserService{

    static async getUserId(username:string): Promise<number | undefined>{
        const query = await DB.query('Select `user_id` from `users`where `username` = ?', [username])
        const rows = query[0] as IUserIdRow[];
        const result = rows[0] as IUserIdRow;
        if(rows.length === 0){
            return undefined;
        }else{
            return result.user_id;
        }
    }

}