import { ICommentQuery, ICommentRequest, ILikeRequest, IViewRequest } from "../model/InteractionModel.js";
export declare class InteractionService {
    static add_comment(data: ICommentRequest): Promise<number>;
    static get_comment(comment_id: number): Promise<ICommentQuery>;
    static check_if_liked(username: string, post_id: number): Promise<boolean>;
    static add_like(data: ILikeRequest): Promise<void>;
    static delete_like(data: ILikeRequest): Promise<void>;
    static add_view(data: IViewRequest): Promise<void>;
}
//# sourceMappingURL=InteractionService.d.ts.map