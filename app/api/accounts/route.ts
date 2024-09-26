// app/api/account/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    // Извлекаем searchParams из URL
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    // Проверяем, что accountId существует и может быть преобразован в число
    if (!accountId || isNaN(Number(accountId))) {
        return NextResponse.json({ error: 'Valid Account ID is required' }, { status: 400 });
    }

    try {
        // Пытаемся найти аккаунт по ID
        const account = await prisma.account.findUnique({
            where: {
                id: parseInt(accountId),
            },
        });

        if (!account) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        return NextResponse.json(account);
    } catch (error) {
        // Обрабатываем ошибки
        console.error('Error fetching account:', error);
        return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
    }
}
