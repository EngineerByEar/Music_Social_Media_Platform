import {IUserRegistration} from "../model/UserModel";
import {DB} from "../db.js"
import {compare, hash} from "bcrypt";
import {ResultSetHeader} from "mysql2";


export class UserService{

    static async register_user(user: IUserRegistration){

        //Checking if username is already taken
        const check_username = await DB.query(`Select * from users where username = ${user.username}`)
        if(check_username){
            return "username_conflict";
        }

        //checking if email has already been used
        const check_email = await DB.query(`Select * from users where email = ${user.email}`)
       if(check_email){
           return "email_conflict";
       }

       //hashing password
       const password = await hash(user.password, 10);

       //trying to create the new user in the database
       try {
           const [ inserted ] = await DB.execute<ResultSetHeader>(`INSERT INTO "Users" ("user_id", "username", "email", "password", "creation_time") VALUES (NULL, ?, ?, ?, current_timestamp())`, [user.username, user.email, password]);
           if(inserted.affectedRows < 1) return "database error";
           return "created";
       }catch(e){
           console.log(e);
           return "database error";
       }

    }

}