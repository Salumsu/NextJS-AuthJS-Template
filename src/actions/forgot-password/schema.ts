import * as z from 'zod';

export const ForgotPasswordSchema = z.object({
    email: z.string({
        invalid_type_error: "Invalid email",
        required_error: "Email is required",
    }).email({
        message: "Invalid email"
    }),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;