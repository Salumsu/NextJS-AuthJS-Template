import * as z from 'zod';

export const VerifySchema = z.object({
    token: z.string().min(1, {
        message: "Token is required"
    })
});

export type TVerifySchema = z.infer<typeof VerifySchema>;