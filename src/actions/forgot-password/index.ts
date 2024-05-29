'use server';

import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { ForgotPasswordSchema } from "./schema";

import { getUserByEmail } from "@/data/user";
import { generateOneTimeToken } from "@/lib/token";
import { sendForgotPasswordEmail } from "@/lib/email";


export const handler = async (data: InputType): Promise<ReturnType> => {
    const { email } = data;

    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: 'Email is not registered'
        }
    }


    try {
        const resetPasswordToken = await generateOneTimeToken(email, 'FORGOTPASSWORD');
        const emailSuccess = await sendForgotPasswordEmail(email, resetPasswordToken.token);

        if (emailSuccess) {
            return {
                success: 'Reset password email sent!'
            }
        } else {
            return {
                error: "Failed to send email, please try again"
            }
        }
    } catch {
        return {
            error: 'Server error'
        }
    }
}


export const forgotPassword = createSafeActionHandler(ForgotPasswordSchema, handler);