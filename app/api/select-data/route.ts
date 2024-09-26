import { NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const contractors = await prisma.contractor.findMany({
            select: { id: true, name: true }
        });

        const accounts = await prisma.account.findMany({
            select: { id: true, accountNumber: true, contractorId: true }
        });

        const cards = await prisma.card.findMany({
            select: { id: true, cardNumber: true, accountNumber: true, contractorId: true }
        });

        return NextResponse.json({ contractors, accounts, cards });
    } catch (error) {
        console.error('Error fetching select data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}