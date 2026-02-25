import { UserActionService } from "../service/UserActionService.js";
import { validateAuth } from "../auth.js";
import { FollowSchema } from "../model/UserActionModel.js";
export class UserActionController {
    static init(app) {
        app.post("/users/follow/:username", validateAuth, UserActionController.follow_user);
        app.delete("/users/follow/:username", validateAuth, UserActionController.unfollow_user);
    }
    static async follow_user(req, res) {
        const data = FollowSchema.parse({
            user_following: req.params._username,
            user_followed: req.params.username
        });
        //Handling missing inputs
        if (!data.user_following || !data.user_followed) {
            res.status(400).json({
                message: "Missing required fields",
                code: "MISSING_FIELDS"
            });
            return;
        }
        const result = await UserActionService.follow_user(data);
        if (result == "ALREADY_FOLLOWING") {
            res.status(400).json({
                "message": "You are already following this user",
                "code": "ALREADY_FOLLOWING"
            });
            return;
        }
        else if (result == "USER_DOES_NOT_EXIST") {
            res.status(404).json({
                "message": "The user you are trying to follow does not exist",
                "code": "USER_DOES_NOT_EXIST"
            });
            return;
        }
        else if (result == "CANNOT_FOLLOW_SELF") {
            res.status(400).json({
                "message": "You cannot follow yourself",
                "code": "CANNOT_FOLLOW_SELF"
            });
            return;
        }
        else if (result == "SUCCESS") {
            res.status(200).json({
                "message": "Successfully followed user",
                "code": "SUCCESS"
            });
        }
    }
    static async unfollow_user(req, res) {
        const data = {
            user_following: req.params._username,
            user_followed: req.params.username
        };
        //Handling missing inputs
        if (!data.user_following || !data.user_followed) {
            res.status(400).json({
                message: "Missing required fields",
                code: "MISSING_FIELDS"
            });
            return;
        }
        const result = await UserActionService.unfollow_user(data);
        if (result == "USER_DOES_NOT_EXIST") {
            res.status(404).json({
                "message": "The user you are trying to unfollow does not exist",
                "code": "USER_DOES_NOT_EXIST"
            });
            return;
        }
        else if (result == "CANNOT_UNFOLLOW_SELF") {
            res.status(400).json({
                "message": "You cannot unfollow yourself",
                "code": "CANNOT_UNFOLLOW_SELF"
            });
            return;
        }
        else if (result == "NOT_FOLLOWING") {
            res.status(400).json({
                "message": "You are not following this user",
                "code": "NOT_FOLLOWING"
            });
            return;
        }
        else if (result == "SUCCESS") {
            res.status(200).json({
                "message": "Successfully unfollowed user",
                "code": "SUCCESS"
            });
            return;
        }
    }
}
//# sourceMappingURL=UserActionController.js.map