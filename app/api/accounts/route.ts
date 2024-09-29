// // app/api/account/route.ts
// import { NextResponse } from 'next/server';
// import { prisma } from "@/prisma/prisma-client";
//
// export async function GET(request: Request) {
//     // Извлекаем searchParams из URL
//     const { searchParams } = new URL(request.url);
//     const accountId = searchParams.get('accountId');
//     const inn = searchParams.get('inn'); // добавлено для обработки ИНН
//
//     // Логика для получения аккаунта по ID
//     if (accountId) {
//         if (isNaN(Number(accountId))) {
//             return NextResponse.json({ error: 'Valid Account ID is required' }, { status: 400 });
//         }
//
//         try {
//             const account = await prisma.account.findUnique({
//                 where: {
//                     id: parseInt(accountId),
//                 },
//             });
//
//             if (!account) {
//                 return NextResponse.json({ error: 'Account not found' }, { status: 404 });
//             }
//
//             return NextResponse.json(account);
//         } catch (error) {
//             console.error('Error fetching account:', error);
//             return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
//         }
//     }
//
//     // Логика для получения всех аккаунтов по ИНН
//     if (inn) {
//         try {
//             const accounts = await prisma.account.findMany({
//                 where: {
//                     inn: inn,
//                 },
//             });
//
//             return NextResponse.json(accounts);
//         } catch (error) {
//             console.error('Error fetching accounts:', error);
//             return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
//         }
//     }
//
//     return NextResponse.json({ error: 'Account ID or INN is required' }, { status: 400 });
// }
