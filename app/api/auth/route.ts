// app/api/auth/route.ts
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { encrypt } from '@/lib/encryption';

// Получение секретного ключа из переменных окружения
const JWT_SECRET = '3d7c4e0f1a2b5d8e9f6c3b7a0d2e5f8c1b4a7d0e3f6c9b2a5d8e1f4a7c0b3d6';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export async function POST(request: Request) {
    // Извлекаем login и password из запроса
    const { login, password } = await request.json();

    try {
        // Пытаемся найти пользователя по номеру карты
        const user = await prisma.user.findUnique({
            where: { login },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Неверный номер карты или пароль' }, { status: 401 });
        }

        // Сравниваем пароли
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
        // Обрабатываем ошибки, включая ошибки Next.js
        console.error('Ошибка при авторизации:', error);
        return NextResponse.json({ success: false, message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
