import { db } from "@/lib/db";

export const getTwoFactorAuthConfirmationByKey = async (key: string) => {
    try {
        const confirmation = await db.twoFactorConfirmation.findFirst({
            where: {
                key,
            }
        })

        return confirmation
    } catch {
        return null;
    }
}