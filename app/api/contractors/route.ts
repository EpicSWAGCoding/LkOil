// app/api/contractors/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    try {
        // Получаем контрагентов
        const contractors = await prisma.contractor.findMany({
            select: {
                id: true,
                name: true,
                inn: true,
            },
        });

        return NextResponse.json(contractors);
    } catch (error) {
        console.error('Error fetching contractors:', error);
        return NextResponse.json({ error: 'Failed to fetch contractors' }, { status: 500 });
    }
}
