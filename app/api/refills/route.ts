// app/api/refills/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get('accountNumber');

    if (!accountNumber) {
        return NextResponse.json({ error: 'Номер счета не указан' }, { status: 400 });
    }

    try {
        // Запрашиваем данные пополнений по номеру счета
        const refills = await prisma.refill.findMany({
            where: { accountNumber },
            select: { id: true, refillDate: true, amount: true, accountNumber: true },
        });

        return NextResponse.json(refills);
    } catch (error) {
        console.error('Ошибка при получении данных пополнений:', error);
        return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
    }
}
