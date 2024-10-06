'use client'

import React, { useMemo } from 'react';
import { Container, Loader } from '@/components/shared';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';
import { useSelectStore } from '@/store/category';
import { formatCurrency, formatDate, useCardTransactions } from '@/hooks';
import { PiggyBank } from 'lucide-react';

interface Transaction {
    id: number;
    card: {
        cardNumber: string;
    };
    transactionDate: string;
    gasStation: string;
    total: number;
    currencyType: string;
}


export const CardsFilter = () => {
    const { selectedOptions } = useSelectStore();
    const cardId = selectedOptions.card?.id; // Извлекаем id из объекта card
    
    const { transactionsData, loading, error, cardNumber } = useCardTransactions(cardId);
    
    const totalAmount = useMemo(
      () => transactionsData.reduce((sum, transaction) => sum + transaction.total, 0),
      [transactionsData]
    );
    const currencyType = transactionsData[0]?.currencyType || 'RUB';
    
    if (loading) return <Loader />;
    if (error) return <div className="text-center text-red-500 p-4 bg-red-100 rounded-md"><p>Ошибка: {error}</p></div>;
    
    return (
      <Container>
          <div className="space-y-6 p-6">
              <h1 className="text-2xl font-bold">Карты</h1>
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
                              {transactionsData.length > 0 ? (
                                transactionsData.map((transaction: Transaction) => (
                                  <TableRow key={transaction.id}>
                                      <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                                      <TableCell>{transaction.card.cardNumber}</TableCell>
                                      <TableCell>{transaction.gasStation}</TableCell>
                                      <TableCell>{formatCurrency(transaction.total, currencyType)}</TableCell>
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
                      <div className="relative">
                          <PiggyBank className="absolute left-2 top-10 transform -translate-y-1/2 text-gray-400" size={24} />
                          <Label>Общая сумма</Label>
                          <Input
                            value={formatCurrency(totalAmount, currencyType)}
                            readOnly
                            className="font-bold text-lg pl-10 w-80"
                          />
                      </div>
                  </CardContent>
              </Card>
          </div>
      </Container>
    );
};