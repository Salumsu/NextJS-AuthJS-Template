const authRoutePrefix = '/auth';

export const SignInRoute = `${authRoutePrefix}/signin`;
export const SignUpRoute = `${authRoutePrefix}/signup`;

export const authRoutes = [
    SignInRoute,
    SignUpRoute,
    `${authRoutePrefix}/signout`
]