import {Express, Request, Response} from "express";
import {RecommendationService} from "../service/RecommendationService.js"
import {validateAuth} from "../auth.js";
import {UserService} from "../service/UserService.js";

export class RecommendationController{
    static async init(app: Express){
        app.get('/guest/recommendations' , RecommendationController.guest_recommendations);
        app.get('/users/recommendations', validateAuth, RecommendationController.user_recommendations);
    }

    static async guest_recommendations(req: Request, res: Response){
        const result = await RecommendationService.get_guest_recommendations();
        res.status(200).send(result);
    }

    static async user_recommendations(req: Request, res: Response){
        const username = req.params._username as string;
        if(!username){
            res.status(401).json({
                message: "Your Session has expired. Please log in again.",
                code: "TOKEN_EXPIRED"
            })
            return;
        }
        const user_id = await UserService.getUserId(username);

        if(!user_id){
            res.status(400).json({
                message: "Unknown user. Please log in again.",
                code: "UNKNOWN_USER"
            })
            return;
        }

        const recommendation_ids = await RecommendationService.get_recommendation_ids(user_id);

        const recommendation_previews = await RecommendationService.get_recommendation_previews(username, recommendation_ids);

        res.status(200).send(recommendation_previews);

    }


}