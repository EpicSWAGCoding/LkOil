import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/', '/billing', '/card', '/limits', '/profile', '/refill'];
const publicRoutes = ['/auth', '/not-auth'];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }

    if (
        isPublicRoute &&
        token &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}