import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// POST запрос для проверки SMS-кода
export async function POST(req: Request) {
    const { phoneNumber, smsCode } = await req.json(); // Получаем тело запроса

    try {
        // Получение сохраненного кода из базы данных
        const savedCode = await prisma.smsCode.findFirst({
            where: { phoneNumber },
            orderBy: { createdAt: 'desc' }, // Берем последний сохраненный код
        });

        if (savedCode && savedCode.code === smsCode) {
            // Код верен
            return NextResponse.json({ success: true, message: 'Код подтвержден' }, { status: 200 });
        } else {
            // Код неверен
            return NextResponse.json({ success: false, message: 'Неверный код' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Ошибка проверки кода', error }, { status: 500 });
    }
}

// Обработка методов, отличных от POST
export function OPTIONS() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
