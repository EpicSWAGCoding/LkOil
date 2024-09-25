// app/api/auth/route.ts
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { encrypt } from '@/lib/encryption';

// Получение секретного ключа из переменных окружения
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export async function POST(request: Request) {
    const { login, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { login },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Неверный номер карты или пароль' }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Неверный номер карты или пароль' }, { status: 401 });
        }

        // Создаем payload для JWT
        const payload = {
            userId: user.id,
        };

        // Шифруем payload
        const encryptedPayload = encrypt(JSON.stringify(payload));

        // Создаем JWT
        const token = sign({ data: encryptedPayload }, JWT_SECRET, { expiresIn: '1h' });

        // Создаем ответ
        const response = NextResponse.json({ success: true, message: 'Успешная авторизация' });

        // Устанавливаем JWT в куки
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        return NextResponse.json({ success: false, message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
