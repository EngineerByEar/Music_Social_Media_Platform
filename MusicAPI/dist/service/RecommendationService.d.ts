import { IRecommendation, IRecommendationQuery, IUserRecommendation } from "../model/RecommendationModel.js";
export declare class RecommendationService {
    static get_guest_recommendations(): Promise<IRecommendation[]>;
    static get_recommendation_ids(user_id: number): Promise<IRecommendationQuery[]>;
    static get_recommendation_previews(username: string, recommendation_ids: IRecommendationQuery[]): Promise<IUserRecommendation[]>;
}
//# sourceMappingURL=RecommendationService.d.ts.map