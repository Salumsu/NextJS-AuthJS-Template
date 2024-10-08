import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import crypto from 'crypto'

import authConfig from "./config"
import { db } from "../lib/db"
import { appConfig } from "@/config/app"
import { cookies } from "next/headers"

import { SIGNIN_ROUTE, TWO_FACTOR_AUTH_ROUTE } from "@/routes"

import { getUserById } from "@/data/user"
import { getAccountByUserId } from "@/data/account"

import { generateOneTimeToken } from "@/lib/token"
import { sendTwoFactorAuthEmail } from "@/lib/email"
import { getTwoFactorAuthConfirmationByKey } from "@/data/two-factor-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true;

            const userNotFoundRoute = new URL(`${SIGNIN_ROUTE}?error=Invalid_credentials`, appConfig.host).href;
            if (!user.id) return userNotFoundRoute;
            const existingUser = await getUserById(user.id);

            if (!existingUser) {
                return userNotFoundRoute;
            }

            if (!existingUser.emailVerified) {
                return new URL(`${SIGNIN_ROUTE}?error=Email_not_verified`, appConfig.host).href;
            }


            if (existingUser.isTwoFactorEnabled) {
                const key = cookies().get('two-factor-auth-key')?.value;


                if (key) {
                    const confirmation = await getTwoFactorAuthConfirmationByKey(key);
                    console.log(confirmation);
                    if (!confirmation || (confirmation.expiresAt && confirmation.expiresAt < new Date())) {

                        cookies().delete('two-factor-auth-key')
                        await db.twoFactorConfirmation.deleteMany({
                            where: {
                                key
                            }
                        })
                    } else {
                        return true;
                    }
                }

                const code = crypto.randomBytes(10).toString('hex');
                const newTwoFactorToken = await generateOneTimeToken(existingUser.email ?? '', 'TWOFACTORAUTH', { payload: code, hours: 1 });

                const emailSuccess = await sendTwoFactorAuthEmail(existingUser.email ?? '', code, newTwoFactorToken.token);

                if (emailSuccess) {
                    return new URL(`${TWO_FACTOR_AUTH_ROUTE}?token=${newTwoFactorToken.token}`, appConfig.host).href;
                } else {
                    return new URL(`${SIGNIN_ROUTE}?error=Failed_to_send_2FA`, appConfig.host).href;
                }
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

                session.user.isTwoFactorEnabled = token?.isTwoFactorEnabled ?? false;
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
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

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
    trustHost: true,
    ...authConfig,
})