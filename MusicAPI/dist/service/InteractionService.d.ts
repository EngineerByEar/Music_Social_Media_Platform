import { ICommentQuery, ICommentRequest } from "../model/InteractionModel.js";
export declare class InteractionService {
    static add_comment(data: ICommentRequest): Promise<number>;
    static get_comment(comment_id: number): Promise<ICommentQuery>;
}
//# sourceMappingURL=InteractionService.d.ts.map