import * as z from 'zod';

export const ToggleTwoFactorSchema = z.object({
    enable: z.boolean(),
    delete_confirmations_on_off: z.boolean().nullish()
});

export type TToggleTwoFactorSchema = z.infer<typeof ToggleTwoFactorSchema>;