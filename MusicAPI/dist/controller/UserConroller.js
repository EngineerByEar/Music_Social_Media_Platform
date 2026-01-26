import { UserService } from "../service/UserService.js";
export class UserController {
    static async init(app) {
        app.post('/auth/register', UserController.register);
    }
    static async register(req, res) {
        // add near the top of your register handler
        console.log('handler register called', { method: req.method, path: req.path, body: req.body });
        const user = req.body;
        if (!user.username || !user.email || !user.password) {
            res.status(400).json({
                "message": "Missing required field",
                "code": "INVALID_CREDENTIALS"
            });
            return;
        }
        const result = await UserService.register_user(user);
        if (result == "created") {
            res.status(201).json({
                "token": "rerijgowreojg",
                "user": user
            });
        }
        if (result == "username_conflict") {
            res.status(409).json({
                "message": "Username already taken",
                "code": "USERNAME_TAKEN"
            });
        }
        if (result == "email_conflict") {
            res.status(409).json({
                "message": "EMail is already in use by another account",
                "code": "EMAIL_TAKEN"
            });
        }
        if (result == "database error") {
            res.status(400).json({
                "message": "Database Error",
                "code": "DATABASE_ERROR"
            });
        }
    }
}
//# sourceMappingURL=UserConroller.js.map