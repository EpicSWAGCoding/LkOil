import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: 'Вы вышли из системы' });
    response.cookies.set('userId', '', { path: '/', httpOnly: true, expires: new Date(0) }); // Удаление куки
    return response;
}
