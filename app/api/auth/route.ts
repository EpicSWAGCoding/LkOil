import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { decrypt, encrypt } from '@/lib/encryption';
import { verify } from 'jsonwebtoken';

// Секретный ключ для подписи JWT. Храните это в безопасном месте, например, в переменных окружения.
const JWT_SECRET = process.env.JWT_SECRET;

async function verifyJwtToken(token: string) { // Удалите export
    try {
        const decoded = verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            throw new Error('Invalid token');
        }
        const decryptedPayload = decrypt(decoded.data);
        return JSON.parse(decryptedPayload);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
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

        console.log('карта правильная');

        // Проверяем пароль
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Неверный номер карты или пароль' }, { status: 401 });
        }

        console.log('пароль правильный');

        // Создаем payload для JWT
        const payload = {
            userId: user.id,
            // Добавьте другие нужные данные
        };

        console.log('создали payload для JWT', payload);

        // Шифруем payload
        const encryptedPayload = encrypt(JSON.stringify(payload));

        console.log('Шифруем payload', encryptedPayload);

        // Создаем JWT
        const token = sign({ data: encryptedPayload }, JWT_SECRET, { expiresIn: '1h' });

        console.log('Создаем JWT', token);

        // Создаем ответ
        const response = NextResponse.json({ success: true, message: 'Успешная авторизация' });

        // Устанавливаем JWT в куки
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 час
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        return NextResponse.json({ success: false, message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}