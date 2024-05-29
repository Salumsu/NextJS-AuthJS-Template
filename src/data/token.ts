import { TokenType } from "@prisma/client";

import { db } from "@/lib/db";

export const getOneTimeTokenByEmail = async (email: string, type: TokenType) => {
    try {
        return await db.oneTimeToken.findFirst({
            where: {
                email,
                type
            }
        })

    } catch {
        return null;
    }
}

export const getOneTimeTokenByToken = async (token: string, type: TokenType) => {
    try {
        return await db.oneTimeToken.findFirst({
            where: {
                token,
                type
            }
        })

    } catch {
        return null;
    }
}