import { InteractionService } from "../service/InteractionService.js";
import { validateAuth } from "../auth.js";
export class InteractionController {
    static async init(app) {
        app.post('/interactions/posts/:post_id/comment', validateAuth, InteractionController.add_comment);
        app.post('/interactions/posts/:post_id/like', validateAuth, InteractionController.add_like);
        app.post('/interactions/posts/:post_id/view', validateAuth, InteractionController.add_view);
    }
    static async add_comment(req, res) {
        console.log("Adding comment...");
        const data = {
            ...req.body,
            post_id: Number(req.params.post_id),
            username: req.params._username
        };
        //Handling missing Input Data
        if (!data.username) {
            res.status(401).json({
                "message": "You need to be logged in in order to add a comment",
                "code": "NOT_LOGGED_IN"
            });
        }
        if (!data.post_id || !data.comment) {
            res.status(400).json({
                "message": "Missing fields. Comment field is probably empty",
                "code": "MISSING_FIELDS"
            });
        }
        //Adding comment to Database
        const comment_id = Number(await InteractionService.add_comment(data));
        const comment_data = await InteractionService.get_comment(comment_id);
        res.status(200).json({
            "username": comment_data.username,
            "comment": comment_data.comment,
            "comment_time": comment_data.comment_time
        });
    }
    static async add_like(req, res) {
        const data = {
            username: req.params._username,
            post_id: Number(req.params.post_id)
        };
        //Handling missing Input Data
        if (!data.username) {
            res.status(401).json({
                "message": "You need to be logged in in order to like a post",
                "code": "NOT_LOGGED_IN"
            });
        }
        if (await InteractionService.check_if_liked(data.username, data.post_id)) {
            res.status(400).json({
                "message": "You have already liked this post",
                "code": "ALREADY_LIKED"
            });
            return;
        }
        await InteractionService.add_like(data);
        res.status(200).send();
    }
    static async add_view(req, res) {
        const data = {
            ...req.body,
            post_id: Number(req.params.post_id),
            username: req.params._username,
        };
        if (!data.username) {
            res.status(401).json({
                "message": "You need to be logged in in order to store watchtime",
                "code": "NOT_LOGGED_IN"
            });
        }
        if (!data.post_id || !data.completed || !data.watch_time_seconds) {
            res.status(400).json({
                "message": "Missing fields",
                "code": "MISSING_FIELDS"
            });
        }
        await InteractionService.add_view(data);
        res.status(200).send();
    }
}
//# sourceMappingURL=InteractionController.js.map