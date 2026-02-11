import { AuthService } from "../service/AuthService.js";
import { generateToken } from "../auth.js";
import { UserController } from "./UserController.js";
import { UserService } from "../service/UserService.js";
export class AuthController {
    static async init(app) {
        app.post('/auth/register', AuthController.register);
        app.post('/auth/login', AuthController.login);
    }
    static async register(req, res) {
        const user = req.body;
        if (!user.username || !user.email || !user.password) {
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }
        const result = await AuthService.register_user(user);
        //Handling different Error messages and Status
        if (result == "created") {
            await UserController.init_content_preferences(user.username);
            await UserController.init_ui_settings(user.username);
            await UserController.init_profile(user.username);
            res.status(201).json({
                "token": generateToken({ username: user.username }),
                "user": user
            });
        }
        if (result == "username_conflict") {
            res.status(409).json({
                "message": "Username already taken",
                "code": "USERNAME_TAKEN"
            });
            return;
        }
        if (result == "email_conflict") {
            res.status(409).json({
                "message": "EMail is already in use by another account",
                "code": "EMAIL_TAKEN"
            });
            return;
        }
        if (result == "database error") {
            res.status(400).json({
                "message": "Database Error",
                "code": "DATABASE_ERROR"
            });
            return;
        }
    }
    static async login(req, res) {
        const user = req.body;
        if (!user.username || !user.password) {
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }
        const result = await AuthService.login_user(user);
        //Handling different Error messages and Status
        if (result.message == "confirmed") {
            const ui_settings = await UserService.get_ui_settings(result.user_id);
            const content_preferences = await UserService.get_content_preferences(result.user_id);
            res.status(201).json({
                "token": generateToken({ username: user.username }),
                "user": {
                    username: result.username,
                    email: result.email,
                    user_id: result.user_id
                },
                "ui_settings": ui_settings,
                "content_preferences": content_preferences
            });
        }
        if (result.message == "wrong_username_or_password") {
            res.status(401).json({
                "message": "Wrong username or password",
                "code": "INVALID_CREDENTIALS"
            });
        }
    }
}
//# sourceMappingURL=AuthController.js.map