import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    // Если токен существует, перенаправляем на главную страницу
    if (token) {
        // Перенаправляем авторизованных пользователей на главную страницу
        const url = req.nextUrl.clone();
        url.pathname = '/'; // или укажите нужный путь для авторизованных пользователей
        return NextResponse.redirect(url);
    }

    // Разрешить доступ к страницам авторизации, если нет токена
    if (req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname === '/not-auth') {
        return NextResponse.next();
    }

    // Если токен не найден и пользователь пытается попасть на защищенные страницы, перенаправляем на "not-auth"
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
    matcher: ['/', '/profile/:path*', '/card/:path*', '/billing/:path*', '/refill/:path*', '/not-auth'], // Добавлено '/not-auth' в matcher
};
