import { NextResponse } from "next/server"; // Импортируйте, если используете

export function setCookie(response: NextResponse, name: string, value: string, options: Record<string, unknown> = {}) {
    response.cookies.set(name, value, {
        path: '/',
        httpOnly: true,
        ...options,
    });
    return response;
}
