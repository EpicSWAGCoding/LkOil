import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { setCookie } from "@/lib/cookies";

export async function POST(request) {
    const {login, password} = await request.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                login,
                password,
            },
        });

        if (!user) {
            return NextResponse.json({success: false, message: 'Неверный номер карты или пароль'}, {status: 401});
        }

        let response = NextResponse.json({success: true, message: 'Успешная авторизация'});
        response = setCookie(response, 'userId', user.id);

        return response;
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        return NextResponse.json({success: false, message: 'Внутренняя ошибка сервера'}, {status: 500});
    }
}