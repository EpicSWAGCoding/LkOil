import { NextResponse } from 'next/server'
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
        return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    try {
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
        return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
    }
}
