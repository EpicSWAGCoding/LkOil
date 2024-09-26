import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: 'Вы вышли из системы' });

    // Удаление JWT токена, который используется для авторизации
    response.cookies.set('token', '', { path: '/', httpOnly: true, expires: new Date(0) });

    return response;
}
