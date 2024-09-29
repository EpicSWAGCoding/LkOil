'use client'

import {Container, Loader} from "@/components/shared";
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui";
import { useSelectStore } from "@/store/category";
import {useEffect, useState} from "react";

interface Refill {
    id: number;
    accountNumber: string;
    refillDate: string;
    amount: number;
}

export const Deposit = () => {

    const { selectedOptions } = useSelectStore(); // Получаем выбранный accountId
    const accountId = selectedOptions.account;

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const [deposits, setDeposits] = useState<Refill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [accountNumber, setAccountNumber] = useState<string | null>(null);

    // Функция для получения accountNumber по accountId
    const fetchAccountNumber = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/select-data');
            if (!response.ok) throw new Error('Ошибка получения данных счетов');

            const data = await response.json();

            console.log(data.accounts); // Проверяем, что приходит

            // Находим аккаунт по id
            const account = data.accounts.find((a: { id: number }) => a.id === Number(accountId));

            if (account) {
                setAccountNumber(account.accountNumber); // Устанавливаем accountNumber
            } else {
                throw new Error('Счет не найден');
            }
        } catch (err) {
            console.error(err);
            setError('Ошибка при получении номера счета');
        }
    };

    // Функция для получения данных пополнений по accountNumber
    const fetchDeposits = async () => {
        if (!accountNumber) return;

        setError(null);

        try {
            const response = await fetch(`/api/refills?accountNumber=${accountNumber}`);

            if (!response.ok) {
                throw new Error('Ошибка загрузки данных пополнений');
            }

            const data = await response.json();
            setDeposits(data);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке пополнений');
        } finally {
            setLoading(false);
        }
    };

    // Запрашиваем accountNumber при изменении accountId
    useEffect(() => {
        if (accountId) {
            fetchAccountNumber();
        }
    }, [accountId]);

    // Запрашиваем данные пополнений при изменении accountNumber
    useEffect(() => {
        if (accountNumber) {
            fetchDeposits();
        }
    }, [accountNumber]);

    return (
        <Container>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Пополнения</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
                        <p>Ошибка: {error}</p>
                    </div>
                ) : (
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Дата</TableHead>
                                        <TableHead>Сумма</TableHead>
                                        <TableHead>Номер счета</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {deposits.length > 0 ? (
                                        deposits.map((deposit) => (
                                            <TableRow key={deposit.id}>
                                                <TableCell>{formatDate(deposit.refillDate)}</TableCell>
                                                <TableCell>{deposit.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</TableCell>
                                                <TableCell>{deposit.accountNumber}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3}>Пополнения не найдены</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Container>
    )
}