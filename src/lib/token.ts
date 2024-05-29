import { TokenType } from "@prisma/client";

import { db } from "./db";

export const generateOneTimeToken = async (email: string, type: TokenType, hours?: number) => {
    const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000 * (hours ?? 24));

    await db.oneTimeToken.deleteMany({
        where: {
            email,
            type
        }
    })

    return await db.oneTimeToken.create({
        data: {
            email,
            expiresAt,
            type
        }
    })

}