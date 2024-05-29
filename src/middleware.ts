import NextAuth from "next-auth"

import authConfig from '@/auth/config'
import { AUTH_ROUTE_PREFIX, DEFAULT_SIGNIN_REDIRECT, PUBLIC_ROUTES, SIGNIN_ROUTE } from "./routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
    const isLoggedIn = !!req.auth?.user;
    const url = req.nextUrl;
    const pathname = url.pathname

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = pathname.startsWith(AUTH_ROUTE_PREFIX);

    if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, url));
    }

    if (!isAuthRoute && !isPublicRoute && !isLoggedIn) {
        return Response.redirect(new URL(SIGNIN_ROUTE, url));
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}