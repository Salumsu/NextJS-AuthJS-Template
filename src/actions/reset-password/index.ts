'use server';

import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation";

import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { ResetPasswordSchema } from "./schema";

import { SIGNIN_ROUTE } from '@/routes';
import { db } from '@/lib/db';

import { getOneTimeTokenByToken } from "@/data/token";


export const handler = async (data: InputType): Promise<ReturnType> => {
    const { token, password } = data;

    const resetPasswordToken = await getOneTimeTokenByToken(token, 'FORGOTPASSWORD');

    if (!resetPasswordToken) {
        return {
            error: "Invalid or expired token"
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.oneTimeToken.delete({
            where: {
                id: resetPasswordToken.id,
                type: 'FORGOTPASSWORD'
            }
        })

        await db.user.update({
            where: {
                email: resetPasswordToken.email
            },
            data: {
                password: hashedPassword
            }
        })

    } catch {
        return {
            error: 'Server error'
        }
    }

    redirect(`${SIGNIN_ROUTE}?success=Password_reset_successfull`)
}


export const resetPassword = createSafeActionHandler(ResetPasswordSchema, handler);