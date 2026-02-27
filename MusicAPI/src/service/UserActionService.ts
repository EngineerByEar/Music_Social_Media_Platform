import {IFollow} from "../model/UserActionModel.js";
import {UserService} from "./UserService.js";
import {DB} from "../db.js";

export class UserActionService {

    static async check_if_following(requesting_user_id: number, profile_id:number){
        const query = await DB.query(`
            SELECT 1 FROM follows
            WHERE following_user = ? AND followed_user = ?`, [requesting_user_id, profile_id])
        const rows = query[0] as IFollow[];
        return rows.length > 0;
    }

    static async follow_user(data: IFollow){
        const user_id_following = await UserService.getUserId(data.user_following);
        const user_id_followed = await UserService.getUserId(data.user_followed);

        if(user_id_followed == user_id_following) {
            return "CANNOT_FOLLOW_SELF";
        }
        if(!user_id_followed){
            return "USER_DOES_NOT_EXIST";
        }
        //Check if already following
        if(await UserActionService.check_if_following(user_id_following!, user_id_followed)) {
            return "ALREADY_FOLLOWING";
        }

        await DB.execute(`
            INSERT INTO follows(following_user, followed_user)
            VALUES(?, ?)`, [user_id_following!, user_id_followed!]);

        return "SUCCESS";

    }

    static async unfollow_user(data: IFollow){
        const user_id_following = await UserService.getUserId(data.user_following);
        const user_id_followed = await UserService.getUserId(data.user_followed);

        if(!user_id_followed){
            return "USER_DOES_NOT_EXIST";
        }

        if(user_id_followed == user_id_following) {
            return "CANNOT_UNFOLLOW_SELF";
        }

        const query = await DB.query(`
            SELECT 1 FROM follows
            WHERE following_user = ? AND followed_user = ?`, [user_id_following, user_id_followed])
        const rows = query[0] as IFollow[];
        if(rows.length == 0){
            return "NOT_FOLLOWING";
        }

        await DB.execute(`
        DELETE FROM follows
        WHERE following_user = ? AND followed_user =?`, [user_id_following!, user_id_followed!]);

        return "SUCCESS";
    }
}