import {Express, Request, Response} from 'express';
import {UserService} from "../service/UserService.js"
import {IUserRegistration} from "../model/UserModel.js";

export class UserController{
    static async init(app: Express){
        app.post('/auth/register', UserController.register)
    }

    static async register(req:Request, res: Response){
        // add near the top of your register handler
        console.log('handler register called', { method: req.method, path: req.path, body: req.body });
        const user: IUserRegistration = req.body;

        if(!user.username || !user.email || !user.password){
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }

        const result = await UserService.register_user(user);

    }


}