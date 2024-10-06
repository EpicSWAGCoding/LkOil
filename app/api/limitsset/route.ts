// app/api/limits/set/route.ts

export async function POST(request: Request) {
	const { fuelType, limit, driverName, carNumber, cardId } = await request.json();

	// try {
	// 	const newLimit = await prisma.limit.create({
	// 		data: {
	// 			fuelType,
	// 			limit: parseFloat(limit), // Убедитесь, что лимит число
	// 			driverName,
	// 			carNumber,
	// 			cardId,
	// 		},
	// 	});
	//
	// 	return NextResponse.json(newLimit, { status: 201 });
	// } catch (error) {
	// 	console.error('Error creating limit:', error);
	// 	return NextResponse.json({ error: 'Failed to create limit' }, { status: 500 });
	// }
}
