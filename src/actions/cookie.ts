'use server'

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export const setCookie = async (name: string, value: string, cookie?: Partial<ResponseCookie>) => {
    cookies().set(name, value, cookie)
}

export const getCookie = async (name: string) => {
    return cookies().get(name)
}

export const deleteCookie = async (name: string) => {
    cookies().delete(name);
}