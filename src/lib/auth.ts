'use server'

import { auth } from "@/auth"

export const getCurrentUser = async () => {
    const session = await auth();

    return session?.user
}

export const getCurrentUserRole = async () => {
    const user = await getCurrentUser();

    return user?.role
}