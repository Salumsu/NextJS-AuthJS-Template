import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import crypto from 'crypto'
import { cookies } from 'next/headers'

import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { LoginSchema } from '@/actions/login/schema';

import { db } from '@/lib/db'

import { getUserByEmail } from '@/data/user';
import { getOneTimeTokenByToken } from '@/data/token'
import { addHours } from 'date-fns'

export default {
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: 'email',
                    placeholder: 'john.doe@gmail.com',
                    required: true,
                },
                password: {
                    type: 'password',
                    placeholder: '******',
                    required: true,
                },
                twoFA: {
                    hidden: true,
                },
                rememberDevice: {
                    hidden: true
                }
            },
            async authorize(credentials) {
                const { twoFA: token, rememberDevice } = credentials as {
                    twoFA: string | null | undefined,
                    rememberDevice: string | null | undefined
                };

                if (token) {
                    const twoFactorToken = await getOneTimeTokenByToken(token, 'TWOFACTORAUTH');

                    if (!twoFactorToken) {
                        return null;
                    } else {
                        const user = await getUserByEmail(twoFactorToken.email);

                        if (user) {
                            await db.oneTimeToken.delete({
                                where: {
                                    id: twoFactorToken.id,
                                    type: 'TWOFACTORAUTH'
                                }
                            })

                            const key = crypto.randomBytes(10).toString('hex');
                            await db.twoFactorConfirmation.create({
                                data: {
                                    userId: user.id,
                                    key,
                                    expiresAt: rememberDevice === "on" ? undefined : addHours(new Date(), 24)
                                }
                            })

                            cookies().set('two-factor-auth-key', key, {
                                expires: new Date(2100, 1, 1),
                                path: '/',
                                secure: true,
                                httpOnly: true,
                                sameSite: 'strict'
                            });
                        }
                        return user;
                    }
                }

                const validateResult = LoginSchema.safeParse(credentials);
                if (validateResult.success) {
                    const { email, password } = validateResult.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const match = await bcrypt.compare(password, user.password);

                    if (match) return user;
                }

                return null;
            },
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ]
} satisfies NextAuthConfig;