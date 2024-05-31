'use server';


import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { TwoFactorSchema } from "./schema";


import { getOneTimeTokenByToken } from "@/data/token";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export const handler = async (data: InputType): Promise<ReturnType> => {
    const { token, code, remember_device } = data;

    const twoFactorToken = await getOneTimeTokenByToken(token, 'TWOFACTORAUTH');

    if (!twoFactorToken || twoFactorToken.expiresAt < new Date()) {
        return {
            error: "Token expired"
        }
    }

    if (twoFactorToken.payload !== code) {
        return {
            error: "Wrong code"
        }
    }

    try {

        await signIn('credentials', {
            email: twoFactorToken.email,
            twoFA: twoFactorToken.token,
            redirectTo: DEFAULT_SIGNIN_REDIRECT,
            rememberDevice: remember_device,
        })


        return {
            success: 'Signin success'
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' }
                default:
                    return { error: 'Server error' }
            }
        }

        throw error;
    }
}


export const twoFactor = createSafeActionHandler(TwoFactorSchema, handler);