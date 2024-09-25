import bcrypt from 'bcrypt';
import { prisma } from './prisma-client';
import { Prisma } from '@prisma/client';

async function down() {
    // Очищаем таблицы в правильном порядке, учитывая зависимости
    await prisma.$executeRaw`TRUNCATE TABLE "Limit" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Transaction" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Refill" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Balance" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "UserContractorBinding" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Card" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Account" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Contractor" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function up() {

    // Создание пользователей
    const hashedPassword1 = await bcrypt.hash('cardpass2023', 10);
    const hashedPassword2 = await bcrypt.hash('adminsecure456', 10);

    const user1 = await prisma.user.create({
        data: {
            login: '4287123412340000',  // Реалистичный номер карты
            password: hashedPassword1,
            username: 'Иван Петров',
            isAdmin: false,
        },
    });

    const adminUser = await prisma.user.create({
        data: {
            login: '5299321432141111',  // Реалистичный номер карты для админа
            password: hashedPassword2,
            username: 'Алексей Сидоров',
            isAdmin: true,
        },
    });

    // Создание контрагентов
    const contractor1 = await prisma.contractor.create({
        data: {
            name: 'ООО «Газпромнефть-Региональные Сбытовые Компании»',
            inn: '5000000000',
            phone: '+7-495-123-45-67',
        },
    });

    const contractor2 = await prisma.contractor.create({
        data: {
            name: 'ООО «Татнефть-АЗС Центр»',
            inn: '7700000000',
            phone: '+7-843-765-43-21',
        },
    });

    // Создание счетов
    const account1 = await prisma.account.create({
        data: {
            contractorId: contractor1.id,
            accountNumber: 'ACC100000',
            segment: 'Корпоративный',
            contract: 'Договор №101',
            currencyType: 'RUB',
            accountType: 'дебет',
            validFrom: new Date('2024-01-01'),
            validTo: new Date('2025-01-01'),
            balance: 200000.0,
        },
    });

    const account2 = await prisma.account.create({
        data: {
            contractorId: contractor2.id,
            accountNumber: 'ACC200000',
            segment: 'Премиум',
            contract: 'Договор №202',
            currencyType: 'RUB',
            accountType: 'кредит',
            validFrom: new Date('2024-02-01'),
            validTo: new Date('2025-02-01'),
            balance: 120000.0,
        },
    });

    // Создание карт
    const card1 = await prisma.card.create({
        data: {
            contractorId: contractor1.id,
            accountNumber: account1.accountNumber,
            cardNumber: 'CARD100000',
            segment: 'Премиум',
            limit: 75000.0,
            currencyType: 'RUB',
            balance: 50000.0,
        },
    });

    const card2 = await prisma.card.create({
        data: {
            contractorId: contractor2.id,
            accountNumber: account2.accountNumber,
            cardNumber: 'CARD200000',
            segment: 'Стандарт',
            limit: 40000.0,
            currencyType: 'RUB',
            balance: 25000.0,
        },
    });

    // Создание привязок пользователей к контрагентам
    await prisma.userContractorBinding.createMany({
        data: [
            {
                userId: user1.id,
                contractorId: contractor1.id,
                accountId: account1.id,
                cardId: card1.id,
                isAdmin: false,
            },
            {
                userId: adminUser.id,
                contractorId: contractor2.id,
                accountId: account2.id,
                cardId: card2.id,
                isAdmin: true,
            },
        ],
    });

    // Создание лимитов
    await prisma.limit.create({
        data: {
            cardId: card1.id,
            fuelType: 'Бензин АИ-95',
            limit: 20000.0,
            driverName: 'Иванов Иван',
            carNumber: 'A001AA77',
            pinCode: await bcrypt.hash('1234', 10),
        },
    });

    await prisma.limit.create({
        data: {
            cardId: card2.id,
            fuelType: 'Дизель',
            limit: 15000.0,
            driverName: 'Петров Петр',
            carNumber: 'B002BB88',
            pinCode: await bcrypt.hash('5678', 10),
        },
    });

    // Создание остатков на счетах
    await prisma.balance.createMany({
        data: [
            {
                contractorId: contractor1.id,
                accountNumber: account1.accountNumber,
                balance: 200000.0,
            },
            {
                contractorId: contractor2.id,
                accountNumber: account2.accountNumber,
                balance: 120000.0,
            },
        ],
    });

    // Создание транзакций
    await prisma.transaction.createMany({
        data: [
            {
                contractorId: contractor1.id,
                accountNumber: account1.accountNumber,
                cardId: card1.id,
                transactionDate: new Date('2024-03-15'),
                gasStation: 'АЗС «Газпромнефть», Москва, Каширское шоссе',
                product: 'Бензин АИ-95',
                quantity: 60.0,
                price: 54.5,
                total: 3270.0,
                discount: 200.0,
                finalTotal: 3070.0,
            },
            {
                contractorId: contractor2.id,
                accountNumber: account2.accountNumber,
                cardId: card2.id,
                transactionDate: new Date('2024-04-20'),
                gasStation: 'АЗС «Татнефть», Казань, Проспект Победы',
                product: 'Дизель',
                quantity: 40.0,
                price: 52.0,
                total: 2080.0,
                discount: 100.0,
                finalTotal: 1980.0,
            },
        ],
    });

    // Создание пополнений
    await prisma.refill.createMany({
        data: [
            {
                contractorId: contractor1.id,
                accountNumber: account1.accountNumber,
                refillDate: new Date('2024-03-10'),
                segment: 'Корпоративный',
                amount: 100000.0,
            },
            {
                contractorId: contractor2.id,
                accountNumber: account2.accountNumber,
                refillDate: new Date('2024-04-05'),
                segment: 'Премиум',
                amount: 50000.0,
            },
        ],
    });

    console.log('База данных успешно заполнена начальными данными.');
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
