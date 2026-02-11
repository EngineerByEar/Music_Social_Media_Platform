import { RecommendationService } from "../service/RecommendationService.js";
export class RecommendationController {
    static async init(app) {
        app.get('/guest/recommendations', RecommendationController.guest_recommendations);
    }
    static async guest_recommendations(req, res) {
        const result = await RecommendationService.get_guest_recommendations();
        res.status(200).send(result);
    }
}
//# sourceMappingURL=RecommendationController.js.map