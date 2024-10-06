'use client';

import { Container, Loader } from '@/components/shared';
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';
import { useSelectStore } from '@/store/category';
import { formatDate, useFetchDeposits } from '@/hooks';

export const Deposit = () => {
    
    const { selectedOptions } = useSelectStore();
    const accountId = selectedOptions.account;
    
    const { deposits, loading, error } = useFetchDeposits(accountId);
    
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
    );
};
