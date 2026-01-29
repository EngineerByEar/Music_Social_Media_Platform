import {Express, Request, Response} from "express";
import {RecommendationService} from "../service/RecommendationService.js"

export class RecommendationController{
    static async init(app: Express){
        console.log("RecommendationController init");
        app.get('/guest/recommendations' , RecommendationController.guest_recommendations)
    }

    static async guest_recommendations(req: Request, res: Response){
        const result = await RecommendationService.get_guest_recommendations();
        res.status(200).send(result);
    }
}