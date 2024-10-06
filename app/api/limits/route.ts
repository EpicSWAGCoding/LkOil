// app/api/limits/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request) {
	try {
		// Получаем лимиты с номерами карт
		const limits = await prisma.limit.findMany({
			include: {
				card: {
					select: {
						cardNumber: true,
					},
				},
			},
		});
		
		return NextResponse.json(limits);
	} catch (error) {
		console.error('Error fetching limits:', error);
		return NextResponse.json({ error: 'Failed to fetch limits' }, { status: 500 });
	}
}
