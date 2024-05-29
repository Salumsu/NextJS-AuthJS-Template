'use server';

import { AuthError } from "next-auth";

import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { LoginSchema } from "./schema";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/email";
import { generateOneTimeToken } from "@/lib/token";
import { getOneTimeTokenByEmail } from "@/data/token";

export const handler = async (data: InputType): Promise<ReturnType> => {
    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: 'Invalid credentials'
        }
    }

    try {
        if (!user.emailVerified) {
            const tokenExists = await getOneTimeTokenByEmail(email, 'VERIFICATION');

            if (tokenExists) {
                return {
                    error: 'Please verify your email first'
                }
            } else {
                const verificationToken = await generateOneTimeToken(email, 'VERIFICATION');

                const emailSuccess = await sendVerificationEmail(email, verificationToken.token);

                if (emailSuccess) {
                    return {
                        success: 'Email verification sent! Please check your email'
                    }
                } else {
                    return {
                        error: "Failed to send verification, please login to retry"
                    }
                }
            }
        }

        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_SIGNIN_REDIRECT
        })

        return {
            success: 'Signin success'
        }
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' }
                case 'AccessDenied':
                    return { error: 'Email not verified!' }
                default:
                    return { error: 'Server error' }
            }
        }

        throw error;
    }
}


export const login = createSafeActionHandler(LoginSchema, handler);