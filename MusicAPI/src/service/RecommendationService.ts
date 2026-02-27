import {DB} from "../db.js"
import {IRecommendation, IRecommendationQuery, IUserRecommendation} from "../model/RecommendationModel.js";
import {InteractionService} from "./InteractionService.js";

export class RecommendationService {

    static async get_guest_recommendations(){
       const [ rows ] = await DB.query<IRecommendationQuery[]>(
           `SELECT 
                    p.post_id, 
                    p.post_title, 
                    u.username as post_author_username, 
                    pf.post_preview_image_url, 
                    pf.post_audio_url, 
                    count(w.post_id) as post_views_count, 
                    count(l.post_id) as post_likes_count,
                    wf.waveform as post_waveform
           FROM posts p
           LEFT JOIN users u ON p.author_id = u.user_id
           LEFT JOIN postfiles pf ON p.post_id = pf.post_id
           LEFT JOIN likes l on p.post_id = l.post_id
           left join watchtime w on p.post_id = w.post_id
           left join waveforms wf on wf.post_id = p.post_id
           GROUP BY p.post_id
           Order By RAND() LIMIT 10`
       );

       return rows.map((row)=>{
           return {
               ...row,
               post_waveform: row.post_waveform.toString("base64")
           }
       })as IRecommendation[]
    }

    static async get_recommendation_ids(user_id: number){
        const [ rows ] = await DB.query<IRecommendationQuery[]>(`
            SELECT post_id
            FROM posts p
            Order By RAND()
            LIMIT 10`)
        return rows as IRecommendationQuery[];
    }

    static async get_recommendation_previews(username: string, recommendation_ids: IRecommendationQuery[]){
        const previews = [];
        for (const id of recommendation_ids){
            const post_id = id.post_id
            const [ rows ] = await DB.query<IRecommendationQuery[]>(
                `SELECT 
                    p.post_id, 
                    p.post_title, 
                    u.username as post_author_username, 
                    pf.post_preview_image_url, 
                    pf.post_audio_url, 
                    (SELECT count(*) from watchtime w where w.post_id = p.post_id) as post_views_count,
                    (SELECT count(*) from likes l where l.post_id = p.post_id)  as post_likes_count,
                    wf.waveform as post_waveform
               FROM posts p
               LEFT JOIN users u ON p.author_id = u.user_id
               LEFT JOIN postfiles pf ON p.post_id = pf.post_id
               left join waveforms wf on wf.post_id = p.post_id
               WHERE p.post_id = ?`, [post_id]);

            let user_has_liked = false;
            if(await InteractionService.check_if_liked(username, post_id)){
                user_has_liked = true;
            }


            const preview = {
                ...rows[0]!,
                post_waveform: rows[0]!.post_waveform!.toString("base64"),
                user_has_liked
                }as IUserRecommendation

            previews.push(preview);
        }
        return previews;

    }
}