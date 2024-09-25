// Удалите эту строку, если не используете NextResponse
// import { NextResponse } from "next/server";

export function setCookie(response, name, value, options = {}) {
    response.cookies.set(name, value, {
        path: '/',
        httpOnly: true,
        ...options,
    });
    return response;
}
