import { resend } from "./resend"

import { appConfig } from "@/config/app"

import { AccountVerificationEmail } from "@/email/account-verification"
import { ResetPasswordEmail } from "@/email/password-reset";

export const sendVerificationEmail = async (email: string, token: string) => {
    const { error } = await resend.emails.send({
        from: `${appConfig.name} <${appConfig.email}>`,
        to: [email],
        subject: 'Account Verification',
        react: AccountVerificationEmail({ email, token })
    });

    if (error) {
        return {
            success: false,
        }
    }

    return {
        success: true
    }
}

export const sendForgotPasswordEmail = async (email: string, token: string) => {
    const { error } = await resend.emails.send({
        from: `${appConfig.name} <${appConfig.email}>`,
        to: [email],
        subject: 'Reset password',
        react: ResetPasswordEmail({ email, token })
    });

    if (error) {
        return {
            success: false,
        }
    }

    return {
        success: true
    }
}