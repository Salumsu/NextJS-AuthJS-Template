'use server';

import bcrypt from 'bcryptjs'

import { createAuthOnlyAction, createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { UpdateAccInfoSchema } from "./schema";
import { type ExtendedUser } from "@/auth/auth";
import { db } from "@/lib/db";


export const handler = async (data: InputType, user: ExtendedUser): Promise<ReturnType> => {
    const { name, password, confirm_password } = data;

    try {
        const hashedPassword = !!password ? await bcrypt.hash(password, 10) : undefined;

        await db.user.update({
            where: {
                id: user.id
            }, data: {
                name,
                password: hashedPassword
            }
        })

        return {
            success: 'Successfully updated info'
        }
    } catch {
        return {
            error: 'Server error'
        }
    }
}

export const auth = createAuthOnlyAction(handler);
export const updateAccInfo = createSafeActionHandler(UpdateAccInfoSchema, auth);