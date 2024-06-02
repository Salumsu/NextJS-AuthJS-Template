import * as z from 'zod';

export const ResetPasswordSchema = z.object({
    token: z.string({
        invalid_type_error: "Token is required",
        required_error: "Token is required",
    }).min(1, {
        message: "Token is required"
    }),

    password: z.string({
        invalid_type_error: "Token is required",
        required_error: "Token is required",
    }).min(6, {
        message: "Password should be atleast 6 characters long"
    }),
});

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;