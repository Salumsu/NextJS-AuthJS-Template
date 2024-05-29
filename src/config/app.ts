export const appConfig = {
    host: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'APP NAME',
    email: process.env.NEXT_PUBLIC_APP_EMAIL ?? 'onboarding@resend.dev'
}