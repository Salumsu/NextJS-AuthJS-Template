import { Resend } from 'resend';

declare global {
    var resend: Resend | undefined;
}

export const resend = globalThis.resend || new Resend();

if (process.env.NODE_ENV !== "production") globalThis.resend = resend;