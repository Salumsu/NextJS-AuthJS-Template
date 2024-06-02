'use server';

import { createAuthOnlyAction, createSafeActionHandler } from "@/lib/action";
import { InputType, ReturnType } from "./types";
import { ToggleTwoFactorSchema } from "./schema";

import { ExtendedUser } from "@/auth/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const handler = async (data: InputType, user: ExtendedUser): Promise<ReturnType> => {
    const { enable, delete_confirmations_on_off } = data;
    console.log(data);

    try {
        if (!enable && delete_confirmations_on_off) {
            await db.twoFactorConfirmation.deleteMany({
                where: {
                    userId: user.id
                }
            })
        }

        await db.user.update({
            where: {
                id: user.id
            }, data: {
                isTwoFactorEnabled: enable
            }
        })

        revalidatePath(`/my-account/two-factor-auth`)

        return {
            success: "Successfully toggled"
        }
    } catch {
        return {
            error: "Server error"
        }
    }
}

export const auth = createAuthOnlyAction(handler);
export const toggleTwoFactor = createSafeActionHandler(ToggleTwoFactorSchema, auth);