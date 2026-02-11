export interface ICommentRequest{
    username: string;
    comment: string;
    post_id: number;
}

export interface ICommentQuery{
    post_id: number;
    author_id: number;
    comment_id: number;
    comment: string;
    comment_time: string;
    username: string
}