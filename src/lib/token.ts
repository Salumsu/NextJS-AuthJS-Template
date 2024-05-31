import { TokenType } from "@prisma/client";
import { addHours } from 'date-fns'

import { db } from "./db";

export const generateOneTimeToken = async (email: string, type: TokenType, options?: {
    hours?: number;
    payload?: string;
}) => {
    const { hours, payload } = options ?? {};
    const expiresAt = addHours(new Date(), hours ?? 24)

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
            type,
            payload
        }
    })

}