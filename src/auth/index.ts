import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./config"
import { db } from "../lib/db"
import { getUserById } from "@/data/user"
import { getAccountByUserId } from "@/data/account"
import { appConfig } from "@/config/app"
import { SignInRoute } from "@/routes"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            const userNotFoundRoute = new URL(`${SignInRoute}?error=UserNotFound`, appConfig.host).href;
            if (!user.id) return userNotFoundRoute;
            const existingUser = await getUserById(user.id);

            if (!existingUser) {
                return userNotFoundRoute;
            }

            if (!existingUser.emailVerified) {
                return new URL(`${SignInRoute}?error=EmailNotVerified`, appConfig.host).href;
            }

            return true;
        },
        async session({ token, session }) {
            if (session.user) {
                if (token.sub) {
                    session.user.id = token.sub;
                }

                if (token.role) {
                    session.user.role = token.role;
                }

                if (token.email) {
                    session.user.email = token.email;
                }
                session.user.name = token.name;
                session.user.isOAuth = token.isOAuth;
            }


            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;
            const existingAccount = await getAccountByUserId(token.sub);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;

            return token;
        },
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    ...authConfig,
})