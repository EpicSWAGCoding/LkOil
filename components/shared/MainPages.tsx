"use client"

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui";
import { BarChart, Wallet, CreditCard } from 'lucide-react';
import { MainPagesLoader } from "@/components/shared/MainPagesLoader";

// Интерфейсы для данных
interface Transaction {
    id: string; // Или number, в зависимости от вашего API
    transactionDate: string;
    cardNumber: string;
    gasStation: string;
    total: number;
}

interface MainData {
    balance: number;
    activeCards: number;
    transactionsCount: number;
    recentTransactions: Transaction[];
}

// Создание API запросов
const fetchMainData = async (): Promise<MainData> => {
    const res = await fetch('/api/main');
    return await res.json();
}

export const MainPages = () => {

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const [data, setData] = useState<MainData>({
        balance: 0,
        activeCards: 0,
        transactionsCount: 0,
        recentTransactions: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMainData()
            .then((fetchedData) => {
                setData(fetchedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <MainPagesLoader />;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Личный кабинет процессинга топливных карт</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Баланс счетов</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.balance.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Активные карты</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.activeCards}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Транзакции за месяц</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.transactionsCount}</div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Последние транзакции</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Дата</TableHead>
                                <TableHead>Номер карты</TableHead>
                                <TableHead>АЗС</TableHead>
                                <TableHead>Сумма</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.recentTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                                    <TableCell>{transaction.cardNumber}</TableCell>
                                    <TableCell>{transaction.gasStation}</TableCell>
                                    <TableCell>{transaction.total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}