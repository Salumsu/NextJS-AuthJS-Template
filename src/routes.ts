export const AUTH_ROUTE_PREFIX = '/auth';

export const SIGNIN_ROUTE = `${AUTH_ROUTE_PREFIX}/signin`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE_PREFIX}/signup`;
export const ACCOUNT_VERIFICATION_ROUTE = `${AUTH_ROUTE_PREFIX}/verify`
export const FORGOT_PASSWORD_ROUTE = `${AUTH_ROUTE_PREFIX}/forgot-password`
export const RESET_PASSWORD_ROUTE = `${AUTH_ROUTE_PREFIX}/reset-password`
export const TWO_FACTOR_AUTH_ROUTE = `${AUTH_ROUTE_PREFIX}/two-factor`

export const AUTH_ROUTES = [
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    ACCOUNT_VERIFICATION_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    TWO_FACTOR_AUTH_ROUTE,
    `${AUTH_ROUTE_PREFIX}/signout`
]

export const ACCOUNT_SETTINGS_ROUTE = '/my-account'
export const ADMIN_DASHBOARD_ROUTE = "/dashboard"

export const NON_ADMIN_SIGNIN_REDIRECT = '/'
export const DEFAULT_SIGNIN_REDIRECT = ADMIN_DASHBOARD_ROUTE
export const DEFAULT_SIGNOUT_REDIRECT = SIGNIN_ROUTE



export const PUBLIC_ROUTES = [
    '/',
    '/shop',
    '/cart',
]