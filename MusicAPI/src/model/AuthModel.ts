
export interface IAuthRegistration {
    username: string;
    email: string;
    password: string;
}

export interface IAuthRegistrationCheck{
    username: string;
    email: string;
}

export interface IAuthLoginUser{
    username: string;
    password: string;
}

export interface IAuthLoginQuery{
    username: string;
    password: string;
    email: string;
    user_id: number;
}

export interface IAuthLoginResponseConfirmed{
    message: string;
    username: string;
    password: string;
    email: string;
    user_id: number;
}

export interface IAuthLoginResponseError{
    message: string;
}

export type IAuthLoginResponse =
    | IAuthLoginResponseConfirmed
    | IAuthLoginResponseError;
