import {Express, Request, Response} from 'express';
import {InteractionService} from "../service/InteractionService.js";
import {validateAuth} from "../auth.js";
import {
    CommentRequestSchema,
    ICommentRequest,
    ILikeRequest,
    IViewRequest,
    LikeRequestSchema, ViewRequestSchema
} from "../model/InteractionModel.js";
import {PostController} from "./PostController.js";
import {PostService} from "../service/PostService.js";

export class InteractionController {
    static async init(app: Express){
        app.post('/interactions/posts/:post_id/comment', validateAuth, InteractionController.add_comment);
        app.post('/interactions/posts/:post_id/like', validateAuth, InteractionController.add_like);
        app.delete('/interactions/posts/:post_id/like', validateAuth, InteractionController.delete_like);
        app.post('/interactions/posts/:post_id/view', validateAuth, InteractionController.add_view);
    }

    static async add_comment(req: Request, res: Response){
        const data : ICommentRequest = CommentRequestSchema.parse({
            ...req.body,
            post_id: Number(req.params.post_id),
            username: req.params._username
        });

        //Handling missing Input Data
        if(!data.username){
            res.status(401).json({
                "message": "You need to be logged in in order to add a comment",
                "code": "NOT_LOGGED_IN"
            })
        }

        if(!data.post_id || !data.comment){
            res.status(400).json({
                "message": "Missing fields. Comment field is probably empty",
                "code": "MISSING_FIELDS"
            })

        }

        //Adding comment to Database
        const comment_id = Number(await InteractionService.add_comment(data));

        const comment_data = await InteractionService.get_comment(comment_id);

        res.status(200).json({
            "username": comment_data.username,
            "comment": comment_data.comment,
            "comment_time": comment_data.comment_time
        })

    }

    static async add_like(req: Request, res: Response){
        const data = LikeRequestSchema.parse({
            username: req.params._username as string,
            post_id: Number(req.params.post_id)
        }) as ILikeRequest;

        //Handling missing Input Data
        if(!data.username){
            res.status(401).json({
                "message": "You need to be logged in in order to like a post",
                "code": "NOT_LOGGED_IN"
            })
        }
        if(await InteractionService.check_if_liked(data.username, data.post_id)){
            res.status(400).json({
                "message": "You have already liked this post",
                "code": "ALREADY_LIKED"
            })
            return
        }
        await InteractionService.add_like(data);

        const post = await PostService.get_post(undefined, data.post_id);
        if(post != "post_not_found") {
            PostController.broadcast({
                type: "like_count_updated", post_id: data.post_id, count: post.post_likes_count
            });
        }

        res.status(200).json({
            "message": "Post liked successfully",
            "code": "POST_LIKED"
        });


    }

    static async delete_like(req: Request, res: Response){
        const data = LikeRequestSchema.parse({
            username: req.params._username as string,
            post_id: Number(req.params.post_id)
        }) as ILikeRequest;

        //Handling missing Input Data
        if(!data.username){
            res.status(401).json({
                "message": "You need to be logged in in order to unlike a post",
                "code": "NOT_LOGGED_IN"
            })
        }

        if(!await InteractionService.check_if_liked(data.username, data.post_id)){
            res.status(400).json({
                "message": "You have not liked this post",
                "code": "NOT_LIKED"
            })
            return
        }

        await InteractionService.delete_like(data);

        const post = await PostService.get_post(undefined, data.post_id);
        if(post != "post_not_found") {
            PostController.broadcast({
                type: "like_count_updated", post_id: data.post_id, count: post.post_likes_count
            });
        }

        res.status(200).json({
            "message": "Like removed successfully",
            "code": "LIKE_REMOVED"
        })

    }

    static async add_view(req: Request, res: Response){
        const data = ViewRequestSchema.parse({
            ...req.body,
            post_id: Number(req.params.post_id),
            username: req.params._username as string,
        }) as IViewRequest;

        if(!data.username){
            res.status(401).json({
                "message": "You need to be logged in in order to store watchtime",
                "code": "NOT_LOGGED_IN"
            })
        }
        if(!data.post_id || !data.completed || !data.watch_time_seconds){
            res.status(400).json({
                "message": "Missing fields",
                "code": "MISSING_FIELDS"
            })
        }

        await InteractionService.add_view(data);

        const post = await PostService.get_post(undefined, data.post_id);
        if(post != "post_not_found") {
            PostController.broadcast({
                type: "view_count_updated", post_id: data.post_id, count: post.post_views_count
            });
        }

        res.status(200).send();


    }
}