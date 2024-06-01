import * as z from 'zod';

export const UpdateAccInfoSchema = z.object({
    name: z.string(),
    password: z.string().refine((password) => password.length === 0 || password.length >= 6, {
        message: 'Password should be atleast 6 characters long',
    }),
    confirm_password: z.string()
}).refine(({ password, confirm_password }) => {
    if (password) {
        if (password !== confirm_password) {
            return false
        }
    }

    return true;
}, {
    message: "Passwords do not match",
    path: ['confirm_password']
});

export type TUpdateAccInfoSchema = z.infer<typeof UpdateAccInfoSchema>;