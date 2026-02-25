import { z } from "zod";
export const AuthRegistrationSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});
export const AuthLoginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});
//# sourceMappingURL=AuthModel.js.map