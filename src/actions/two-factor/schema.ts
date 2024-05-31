import * as z from 'zod';

export const TwoFactorSchema = z.object({
    token: z.string().min(1, {
        message: "Token is required"
    }),
    code: z.string().min(1, {
        message: "Code is required"
    }),
    remember_device: z.string().optional()
});

export type TTwoFactorSchema = z.infer<typeof TwoFactorSchema>;