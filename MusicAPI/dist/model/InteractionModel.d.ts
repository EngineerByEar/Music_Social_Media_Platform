export interface ICommentRequest {
    username: string;
    comment: string;
    post_id: number;
}
export interface ICommentQuery {
    post_id: number;
    author_id: number;
    comment_id: number;
    comment: string;
    comment_time: string;
    username: string;
}
export interface ILikeRequest {
    post_id: number;
    username: string;
}
export interface IViewRequest {
    post_id: number;
    username: string;
    completed: boolean;
    watch_time_seconds: number;
}
//# sourceMappingURL=InteractionModel.d.ts.map