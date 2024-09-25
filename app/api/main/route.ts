import { NextResponse } from 'next/server'
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
    // Получение баланса, активных карт и транзакций из базы данных
    const balance = await prisma.balance.aggregate({
        _sum: { balance: true }
    })

    const activeCards = await prisma.card.count({
        where: { isBlocked: false }
    })

    const transactionsCount = await prisma.transaction.count({
        where: {
            transactionDate: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        }
    })

    const recentTransactions = await prisma.transaction.findMany({
        take: 5,
        orderBy: { transactionDate: 'desc' },
        include: { card: true }
    })

    return NextResponse.json({
        balance: balance._sum.balance,
        activeCards,
        transactionsCount,
        recentTransactions: recentTransactions.map(tx => ({
            id: tx.id,
            transactionDate: tx.transactionDate.toISOString().split('T')[0],
            cardNumber: tx.card.cardNumber,
            gasStation: tx.gasStation,
            total: tx.total
        }))
    })
}
