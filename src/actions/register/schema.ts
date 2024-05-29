import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z.string({
        required_error: "Name is required",

    }).min(1, {
        message: "Name is required",
    }),
    email: z.string({
        invalid_type_error: "Invalid email",
        required_error: "Email is required",
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password should be atleast 6 characters long"
    })
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;