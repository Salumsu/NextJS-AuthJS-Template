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

export const getTwoFactorConfirmationsByUserId = async (userId: string) => {
    try {
        const confirmations = await db.twoFactorConfirmation.findMany({
            where: {
                userId
            }
        })

        return confirmations
    } catch (err) {
        console.log("GET-TWO-FACTOR-CONFIRMATIONS-BY-USER-ID_ERROR: ", err)
        return [];
    }
}