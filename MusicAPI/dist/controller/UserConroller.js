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
    }
}
//# sourceMappingURL=UserConroller.js.map