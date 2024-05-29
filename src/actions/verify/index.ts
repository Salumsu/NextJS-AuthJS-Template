'use server';

import { redirect } from "next/navigation";

import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { VerifySchema } from "./schema";

import { SIGNIN_ROUTE } from "@/routes";
import { db } from "@/lib/db";

import { getOneTimeTokenByToken } from "@/data/token";

export const handler = async (data: InputType): Promise<ReturnType> => {
    const { token } = data;

    const verificationToken = await getOneTimeTokenByToken(token, 'VERIFICATION');


    if (!verificationToken || verificationToken.expiresAt < new Date()) {
        return {
            error: "Token expired"
        }
    }

    try {
        await db.oneTimeToken.delete({
            where: {
                id: verificationToken.id,
                type: 'VERIFICATION'
            }
        })

        await db.user.update({
            where: {
                email: verificationToken.email
            }, data: {
                emailVerified: new Date()
            }
        })

    } catch {
        return {
            error: 'Server error'
        }
    }

    redirect(`${SIGNIN_ROUTE}?success=Account_verified`)

}


export const verify = createSafeActionHandler(VerifySchema, handler);