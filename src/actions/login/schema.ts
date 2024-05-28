import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: "Invalid email",
        required_error: "Email is required",
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(1, {
        message: "Password is required"
    })
});

export type TLoginSchema = z.infer<typeof LoginSchema>;