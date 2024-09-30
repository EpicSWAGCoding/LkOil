// /send-sms/route.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { prisma } from "@/prisma/prisma-client";

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC7f2dfcd203b72e8502dc152cd4daa673'
const authToken = process.env.TWILIO_AUTH_TOKEN || '1e2ea7af46119fdd11a7526b50d8c6f0'
const client = twilio(accountSid, authToken)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { phoneNumber } = req.body

        try {
            // Генерация случайного 4-значного кода
            const smsCode = Math.floor(1000 + Math.random() * 9000).toString()

            // Сохранение кода в базу данных
            await prisma.smsCode.create({
                data: {
                    phoneNumber,
                    code: smsCode,
                    createdAt: new Date(),
                },
            })

            // Отправка SMS через Twilio
            await client.messages.create({
                body: `Ваш код подтверждения: ${smsCode}`,
                from: process.env.TWILIO_PHONE_NUMBER || '+79259044726', // Твой Twilio номер
                to: phoneNumber,
            })

            res.status(200).json({ success: true, message: 'SMS отправлено' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Ошибка отправки SMS', error })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
