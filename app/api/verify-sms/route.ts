// /verify-sms/route.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/prisma/prisma-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { phoneNumber, smsCode } = req.body

        try {
            // Получение сохраненного кода из базы данных
            const savedCode = await prisma.smsCode.findFirst({
                where: { phoneNumber },
                orderBy: { createdAt: 'desc' }, // Берем последний сохраненный код
            })

            if (savedCode && savedCode.code === smsCode) {
                // Код верен
                res.status(200).json({ success: true, message: 'Код подтвержден' })
            } else {
                // Код неверен
                res.status(400).json({ success: false, message: 'Неверный код' })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Ошибка проверки кода', error })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
