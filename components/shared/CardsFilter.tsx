'use client'

import {useEffect, useState} from "react";
import { Container, Loader } from "@/components/shared";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle, Input, Label,
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui";
import {useSelectStore} from "@/store/category";

interface Transaction {
    id: number;
    cardNumber: string;
    date: string;
    amount: number;
    currencyType: string;
}

interface CardData {
    id: string;
    cardNumber: string;
}

export const CardsFilter = () => {

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const { selectedOptions } = useSelectStore(); // Получаем выбранный card id
    const cardId = selectedOptions.card;

    const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState<string | null>(null);

    // Функция для получения cardNumber по cardId
    const fetchCardNumber = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/select-data');
            if (!response.ok) throw new Error('Ошибка получения данных карт');

            const data = await response.json();
            const card = data.cards.find((c: { id: number }) => c.id === Number(cardId));

            if (card) {
                setCardNumber(card.cardNumber);
            } else {
                throw new Error('Карта не найдена');
            }
        } catch (err) {
            console.error(err);
            setError('Ошибка при получении номера карты');
        }
    };

    // Функция для получения транзакций по cardNumber
    const fetchTransactions = async () => {
        if (!cardNumber) return;

        setError(null);

        try {
            const response = await fetch(`/api/transactions?cardNumber=${cardNumber}`);

            if (!response.ok) {
                throw new Error('Ошибка загрузки данных транзакций');
            }

            const data = await response.json();
            setTransactionsData(data);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке транзакций');
        } finally {
            setLoading(false);
        }
    };

    // Когда изменяется cardId, запрашиваем cardNumber
    useEffect(() => {
        if (cardId) {
            fetchCardNumber();
        }
    }, [cardId]);

    // Когда изменяется cardNumber, запрашиваем транзакции
    useEffect(() => {
        if (cardNumber) {
            fetchTransactions();
        }
    }, [cardNumber]);

    const formatCurrency = (amount: number, currencyType: string): string => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currencyType,
        }).format(amount);
    };

    return (
        <Container>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Карты</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
                        <p>Ошибка: {error}</p>
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Транзакции</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Дата</TableHead>
                                        <TableHead>Номер карты</TableHead>
                                        <TableHead>Описание</TableHead>
                                        <TableHead>Сумма</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.isArray(transactionsData) && transactionsData.length > 0 ? (
                                        transactionsData.map((transaction: Transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                                                <TableCell>{transaction.card.cardNumber}</TableCell>
                                                <TableCell>{transaction.gasStation}</TableCell>
                                                <TableCell>{transaction.total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</TableCell>
                                            </TableRow>
                                    ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>Транзакции не найдены</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Итого</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label>Общая сумма</Label>
                                <Input
                                    value={formatCurrency(
                                        transactionsData.reduce((sum, transaction) => sum + transaction.total, 0),
                                        transactionsData[0]?.currencyType || 'RUB'
                                    )}
                                    readOnly
                                    className="font-bold text-lg"
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Container>
    )
}