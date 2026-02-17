import { ICreatePostRequest, IPostResponse, ICommentResponse, IPostPatchRequest } from "../model/PostModel.js";
export declare class PostService {
    static createPost(data: ICreatePostRequest): Promise<number>;
    static add_post_files(post_id: number, audio_path: string, image_path: string, prev_path: string): Promise<void>;
    static add_post_genres(post_id: number, audio_genres: string[]): Promise<void>;
    static add_post_tags(post_id: number, post_tags: string[]): Promise<void>;
    static validate_author(post_id: number, username: string): Promise<boolean>;
    static update_post(data: IPostPatchRequest): Promise<void>;
    static update_post_genres(post_id: number, audio_genres: string[]): Promise<void>;
    static update_post_tags(post_id: number, post_tags: string[]): Promise<void>;
    static get_post(post_id: number): Promise<IPostResponse | "post_not_found">;
    static get_all_comments(post_id: number): Promise<ICommentResponse[]>;
    static extract_pcm(audio_path: string): Promise<Buffer>;
    static generate_peaks(pcm_buffer: Buffer): number[];
    static generate_waveform(audio_path: string): Promise<void>;
}
//# sourceMappingURL=PostService.d.ts.map