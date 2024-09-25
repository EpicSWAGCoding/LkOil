import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    // Разрешить доступ к странице авторизации, если нет токена
    if (req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname === '/not-auth') {
        return NextResponse.next();
    }

    // Если токен не найден, перенаправляем на страницу "not-auth"
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/not-auth';
        return NextResponse.redirect(url);
    }

    // Если токен существует, разрешаем доступ к запрашиваемой странице
    return NextResponse.next();
}

// Указываем пути, для которых нужно применять middleware
export const config = {
    matcher: ['/', '/profile/:path*', '/card/:path*', '/billing/:path*', '/refill/:path*'], // Здесь указаны страницы, где требуется проверка
};
