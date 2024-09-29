import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cardNumber = searchParams.get('cardNumber');

    if (!cardNumber) {
        return NextResponse.json({ error: 'Номер карты обязателен' }, { status: 400 });
    }

    try {
        // Запрос транзакций по номеру карты
        const transactions = await prisma.transaction.findMany({
            where: {
                card: {
                    cardNumber: cardNumber,
                },
            },
            select: {
                id: true,
                transactionDate: true,
                card: {
                    select: {
                        cardNumber: true,
                    },
                },
                total: true,
                gasStation: true,
            },
            orderBy: {
                transactionDate: 'desc',
            },
        });

        if (transactions.length === 0) {
            return NextResponse.json({ error: 'Транзакции не найдены' }, { status: 404 });
        }

        return NextResponse.json(transactions, { status: 200 });

    } catch (error) {
        console.error('Ошибка при получении транзакций:', error);
        return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
