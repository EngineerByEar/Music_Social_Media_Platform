import {DB} from "../db.js"
import {IRecommendation} from "../model/RecommendationModel.js";

export class RecommendationService {

    static async get_guest_recommendations(){
       const query = await DB.query(
           `SELECT p.post_id, p.post_title, pf.post_preview_image_url, count(l.post_id) as like_count 
           FROM posts p
           LEFT JOIN postfiles pf ON p.post_id = pf.post_id
           LEFT JOIN likes l on p.post_id = l.post_id
           GROUP BY p.post_id
           ORDER BY like_count DESC LIMIT 10`
       );

       return query[0] as IRecommendation[];
    }


}