import { PageService } from "../service/PageService.js";
import { AuthService } from "../service/AuthService.js";
import { UserService } from "../service/UserService.js";
import { validateAuth } from "../auth.js";
export class PageController {
    static async init(app) {
        app.get("/users/:username/loadprofile", AuthService.username_from_token, PageController.load_profile);
        app.get("/users/self/history", validateAuth, PageController.load_history);
    }
    static async load_profile(req, res) {
        const profile_username = req.params.username;
        const requesting_username = req.params._username;
        const profile_id = await UserService.getUserId(profile_username);
        if (!profile_id) {
            res.status(400).json({
                message: "Invalid username (profile not found)",
                code: "PROFILE_NOT_FOUND"
            });
            return;
        }
        const result = await PageService.load_profile(profile_id, requesting_username);
        res.status(200).send(result);
    }
    static async load_history(req, res) {
        const user_id = await UserService.getUserId(req.params._username);
        if (!user_id) {
            res.status(400).json({
                message: "Unknown user, history not found",
                code: "UNKNOWN_USER"
            });
            return;
        }
        const result = await PageService.load_history(user_id);
        res.status(200).send(result);
    }
}
//# sourceMappingURL=PageController.js.map