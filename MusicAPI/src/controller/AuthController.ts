import {Express, Request, Response} from 'express';
import {AuthService} from "../service/AuthService.js"
import {
    IAuthLoginUser,
    IAuthRegistration
} from "../model/AuthModel.js";
import {generateToken} from "../auth.js";

export class AuthController{
    static async init(app: Express){
        app.post('/auth/register', AuthController.register)
        app.post('/auth/login', AuthController.login)
    }

    static async register(req:Request, res: Response){
        const user: IAuthRegistration = req.body;

        if(!user.username || !user.email || !user.password){
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }

        const result = await AuthService.register_user(user);
        //Handling different Error messages and Status
        if(result == "created"){
            res.status(201).json({
                "token": generateToken({username: user.username}),
                "user": user
            })
        }
        if(result == "username_conflict"){
            res.status(409).json({
                "message": "Username already taken",
                "code": "USERNAME_TAKEN"
            })
        }
        if(result == "email_conflict"){
            res.status(409).json({
                "message": "EMail is already in use by another account",
                "code": "EMAIL_TAKEN"
            })
        }
        if(result == "database error") {
            res.status(400).json({
                "message": "Database Error",
                "code": "DATABASE_ERROR"
            })
        }
    }

    static async login(req: Request, res: Response){
        console.log("Made it to login");
        const user: IAuthLoginUser = req.body;

        if(!user.username || !user.password){
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }

        const result = await AuthService.login_user(user);
        //Handling different Error messages and Status
        if(result.message == "confirmed"){
            res.status(201).json({
                "token": generateToken({username: user.username}),
                "user": {
                    username: result.username,
                    email: result.email,
                    user_id: result.user_id
                }
            })
        }
        if(result.message == "wrong_username_or_password"){
            res.status(401).json({
                "message": "Wrong username or password",
                "code": "INVALID_CREDENTIALS"
            })
        }

    }

}

