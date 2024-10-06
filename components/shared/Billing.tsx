'use client'

import { FC, useState } from 'react';
import { AccountDetails, Container, Loader } from '@/components/shared';
import { Button } from '/components/ui';
import { useSelectStore } from '@/store/category';
import { useAccountData } from '@/hooks';

export const Billing: FC = () => {
  
  const { selectedOptions } = useSelectStore();
  const { selectedAccount, loading, error, refetch } = useAccountData(selectedOptions.account);
  const [isAdmin] = useState(false);
  
  return (
    <Container>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Счета</h1>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
            <p>Ошибка: {error}</p>
            <Button
              onClick={refetch}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Повторить попытку
            </Button>
          </div>
        ) : selectedAccount ? (
          <AccountDetails selectedAccount={selectedAccount} isAdmin={isAdmin} />
        ) : (
          <div className="text-center text-gray-500 p-4 rounded-md">
            <p>Пожалуйста, выберите данные для отображения счета.</p>
          </div>
        )}
      </div>
    </Container>
  );
};