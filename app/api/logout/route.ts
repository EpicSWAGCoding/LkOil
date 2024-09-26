// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const response = NextResponse.json({ success: true, message: 'Вы вышли из системы' });

        // Удаление JWT токена, который используется для авторизации
        response.cookies.set('token', '', { path: '/', httpOnly: true, expires: new Date(0) });

        return response;
    } catch (error) {
        console.error('Ошибка при выходе:', error);
        return NextResponse.json({ success: false, message: 'Не удалось выйти из системы' }, { status: 500 });
    }
}
