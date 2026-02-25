import {z} from "zod";

export const AuthRegistrationSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type IAuthRegistration = z.infer<typeof AuthRegistrationSchema>;

export interface IAuthRegistrationCheck{
    username: string;
    email: string;
}


export const AuthLoginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type IAuthLoginUser = z.infer<typeof AuthLoginUserSchema>;

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
