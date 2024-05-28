import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { LoginSchema } from '@/actions/login/schema';
import { getUserByEmail } from '@/data/user';

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
            },
            async authorize(credentials) {
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