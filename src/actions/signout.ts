'use server';

import { signOut } from "@/auth";
import { DEFAULT_SIGNOUT_REDIRECT } from "@/routes";

export const signout = async () => {
    await signOut({
        redirectTo: DEFAULT_SIGNOUT_REDIRECT
    })
}