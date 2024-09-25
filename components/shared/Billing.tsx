import { useState, useEffect, FC } from 'react';
import { Container } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSelectStore } from "@/store/category";
import { Loader } from "./Loader";

interface Account {
    id: number;
    accountNumber: string;
    balance: number;
    currencyType: string;
    accountType: string;
    isBlocked: boolean;
    validTo: string;
    segment?: string;
    contract?: string;
}

export const Billing: FC = () => {
    const { selectedOptions } = useSelectStore();
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Указываем типы параметров
    const formatCurrency = (amount: number, currencyType: string): string => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currencyType,
        }).format(amount);
    };

    const fetchAccountData = async (accountId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/accounts?accountId=${accountId}`);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }

            const data = await response.json();
            setSelectedAccount(data);
        } catch (err) {
            setError(err.message || 'Ошибка при загрузке данных');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedOptions.account) {
            fetchAccountData(selectedOptions.account);
        } else {
            setSelectedAccount(null);
        }
    }, [selectedOptions.account]);

    useEffect(() => {
        setIsAdmin(false);
    }, []);

    return (
        <Container>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Счета</h1>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
                        <p>Ошибка: {error}</p>
                    </div>
                ) : selectedAccount ? (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Общая информация</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <Label>Номер счета</Label>
                                    <Input value={selectedAccount.accountNumber} readOnly />
                                </div>
                                <div>
                                    <Label>Сегмент</Label>
                                    <Input value={selectedAccount.segment || ''} readOnly />
                                </div>
                                <div>
                                    <Label>Договор</Label>
                                    <Input value={selectedAccount.contract || ''} readOnly />
                                </div>
                                <div>
                                    <Label>Тип валюты</Label>
                                    <Input value={selectedAccount.currencyType} readOnly />
                                </div>
                                <div>
                                    <Label>Тип счета</Label>
                                    <Input value={selectedAccount.accountType} readOnly />
                                </div>
                                <div>
                                    <Label>Действует до</Label>
                                    <Input
                                        value={new Date(selectedAccount.validTo).toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label>Статус</Label>
                                    <Input value={selectedAccount.isBlocked ? 'Заблокирован' : 'Активен'} readOnly />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Баланс</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Label>Остаток</Label>
                                    <Input
                                        value={formatCurrency(selectedAccount.balance, selectedAccount.currencyType)}
                                        readOnly={!isAdmin}
                                        className="font-bold text-lg"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 p-4 rounded-md">
                        <p>Пожалуйста, выберите данные для отображения счета.</p>
                    </div>
                )}
            </div>
        </Container>
    );
};