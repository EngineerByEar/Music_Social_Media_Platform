import { ICreatePostRequest, IPostResponse } from "../model/PostModel.js";
export declare class PostService {
    static createPost(data: ICreatePostRequest): Promise<number>;
    static add_post_files(post_id: number, audio_path: string, image_path: string, prev_path: string): Promise<void>;
    static get_post(post_id: number): Promise<IPostResponse | "post_not_found">;
}
//# sourceMappingURL=PostService.d.ts.map