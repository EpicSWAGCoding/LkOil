// app/api/cards/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    // Извлекаем searchParams из URL
    const { searchParams } = new URL(request.url);
    const inn = searchParams.get('inn'); // ИНН контрагента
    const accountNumber = searchParams.get('accountNumber'); // Номер счета

    if (!inn || !accountNumber) {
        return NextResponse.json({ error: 'INN and Account Number are required' }, { status: 400 });
    }

    try {
        // Получаем карты, фильтруя по ИНН и номеру счета
        const cards = await prisma.card.findMany({
            where: {
                contractor: {
                    inn: inn,
                },
                account: {
                    accountNumber: accountNumber,
                },
            },
            select: {
                id: true,
                cardNumber: true,
                balance: true,
                isBlocked: true,
                validFrom: true,
                validTo: true,
            },
        });

        return NextResponse.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
    }
}
