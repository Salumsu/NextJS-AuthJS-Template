'use server';

import bcrypt from 'bcryptjs'


import { createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { RegisterSchema } from "./schema";

import { db } from "@/lib/db";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from '@/lib/email';
import { generateOneTimeToken } from '@/lib/token';

export const handler = async (data: InputType): Promise<ReturnType> => {
    const { name, email, password } = data;

    const emailUsed = await getUserByEmail(email);

    if (emailUsed) {
        return {
            error: "Email is already in use"
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        const verificationToken = await generateOneTimeToken(email, 'VERIFICATION');

        const emailSuccess = await sendVerificationEmail(email, verificationToken.token)

        if (emailSuccess) {
            return {
                success: 'Email verification sent! Please check your email'
            }
        } else {
            return {
                error: "Failed to send verification, please login to retry"
            }
        }
    } catch (err) {
        console.log(err)
        return {
            error: "Server error"
        }
    }

    // redirect(`${SIGNIN_ROUTE}?success=Signup_success`);
}


export const register = createSafeActionHandler(RegisterSchema, handler);