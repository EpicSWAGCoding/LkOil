// app/api/limits/block/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function POST(request: Request) {
	const { cardIds } = await request.json();
	
	try {
		const updatedCards = await prisma.limit.updateMany({
			where: {
				cardId: {
					in: cardIds,
				},
			},
			data: {
				isBlocked: true, // Устанавливаем статус блокировки
			},
		});
		
		return NextResponse.json(updatedCards, { status: 200 });
	} catch (error) {
		console.error('Error blocking cards:', error);
		return NextResponse.json({ error: 'Failed to block cards' }, { status: 500 });
	}
}
