// app/api/select-data/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
    try {
        // Получение данных подрядчиков
        const contractors = await prisma.contractor.findMany({
            select: { id: true, name: true }
        });

        // Получение данных аккаунтов
        const accounts = await prisma.account.findMany({
            select: { id: true, accountNumber: true, contractorId: true }
        });

        // Получение данных карт
        const cards = await prisma.card.findMany({
            select: { id: true, cardNumber: true, accountNumber: true, contractorId: true }
        });

        // Возвращаем собранные данные
        return NextResponse.json({ contractors, accounts, cards });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return NextResponse.json({ error: 'Не удалось получить данные' }, { status: 500 });
    }
}