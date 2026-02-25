import { z } from "zod";
export declare const AuthRegistrationSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type IAuthRegistration = z.infer<typeof AuthRegistrationSchema>;
export interface IAuthRegistrationCheck {
    username: string;
    email: string;
}
export declare const AuthLoginUserSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type IAuthLoginUser = z.infer<typeof AuthLoginUserSchema>;
export interface IAuthLoginQuery {
    username: string;
    password: string;
    email: string;
    user_id: number;
}
export interface IAuthLoginResponseConfirmed {
    message: string;
    username: string;
    password: string;
    email: string;
    user_id: number;
}
export interface IAuthLoginResponseError {
    message: string;
}
export type IAuthLoginResponse = IAuthLoginResponseConfirmed | IAuthLoginResponseError;
//# sourceMappingURL=AuthModel.d.ts.map