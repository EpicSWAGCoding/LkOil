import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client';
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

// POST запрос на отправку SMS
export async function POST(req: Request, res: Response) {
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
        await client.verify.v2.services("VAbff80c57bd66a2c63cef7d683f4178f3")
            .verifications
            .create({to: process.env.TWILIO_PHONE_NUMBER, channel: 'sms'})
            .then(verification => console.log(verification.sid));

        return NextResponse.json({ success: true, message: 'SMS отправлено' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при отправке SMS:', error);
    }
}

// Обработка методов, отличных от POST
export function OPTIONS() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
