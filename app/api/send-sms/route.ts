import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client';
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC7f2dfcd203b72e8502dc152cd4daa673'
const authToken = process.env.TWILIO_AUTH_TOKEN || '1e2ea7af46119fdd11a7526b50d8c6f0'
const client = twilio(accountSid, authToken)

// POST запрос на отправку SMS
export async function POST(req: Request) {
    const { phoneNumber } = await req.json(); // Получаем тело запроса

    try {
        // Генерация случайного 4-значного кода
        const smsCode = Math.floor(1000 + Math.random() * 9000).toString();

        // Сохранение кода в базу данных
        await prisma.smsCode.create({
            data: {
                phoneNumber,
                code: smsCode,
                createdAt: new Date(),
            },
        });

        // Отправка SMS через Twilio
        await client.messages.create({
            body: `Ваш код подтверждения: ${smsCode}`,
            from: process.env.TWILIO_PHONE_NUMBER || '+79259044726', // Твой Twilio номер
            to: phoneNumber,
        });

        return NextResponse.json({ success: true, message: 'SMS отправлено' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Ошибка отправки SMS', error }, { status: 500 });
    }
}

// Обработка методов, отличных от POST
export function OPTIONS() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
