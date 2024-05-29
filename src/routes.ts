export const AUTH_ROUTE_PREFIX = '/auth';

export const SIGNIN_ROUTE = `${AUTH_ROUTE_PREFIX}/signin`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE_PREFIX}/signup`;
export const ACCOUNT_VERIFICATION_ROUTE = `${AUTH_ROUTE_PREFIX}/verify`
export const FORGOT_PASSWORD_ROUTE = `${AUTH_ROUTE_PREFIX}/forgot-password`
export const RESET_PASSWORD_ROUTE = `${AUTH_ROUTE_PREFIX}/reset-password`

export const AUTH_ROUTES = [
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    ACCOUNT_VERIFICATION_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    `${AUTH_ROUTE_PREFIX}/signout`
]

export const DEFAULT_SIGNIN_REDIRECT = "/dashboard"
export const DEFAULT_SIGNOUT_REDIRECT = SIGNIN_ROUTE
export const NON_ADMIN_REDIRECT = '/'

export const PUBLIC_ROUTES = [
    '/',
    '/shop',
    '/cart',
]