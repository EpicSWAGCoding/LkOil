'use client'

import { useEffect, useState } from 'react';

interface Refill {
	id: number;
	accountNumber: string;
	refillDate: string;
	amount: number;
}

export const useFetchDeposits = (accountId: string | null) => {
	const [deposits, setDeposits] = useState<Refill[]>([]);
	const [accountNumber, setAccountNumber] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		const fetchAccountNumber = async () => {
			setLoading(true);
			try {
				const response = await fetch('/api/select-data');
				if (!response.ok) throw new Error('Ошибка получения данных счетов');
				const data = await response.json();
				
				const account = data.accounts.find((a: { id: number }) => a.id === Number(accountId));
				if (account) {
					setAccountNumber(account.accountNumber);
				} else {
					throw new Error('Счет не найден');
				}
			} catch (err) {
				setError('Ошибка при получении номера счета');
			} finally {
				setLoading(false);
			}
		};
		
		if (accountId) {
			fetchAccountNumber();
		}
	}, [accountId]);
	
	useEffect(() => {
		const fetchDeposits = async () => {
			if (!accountNumber) return;
			setError(null);
			setLoading(true);
			try {
				const response = await fetch(`/api/refills?accountNumber=${accountNumber}`);
				if (!response.ok) throw new Error('Ошибка загрузки данных пополнений');
				const data = await response.json();
				setDeposits(data);
			} catch (err) {
				setError('Ошибка при загрузке пополнений');
			} finally {
				setLoading(false);
			}
		};
		
		if (accountNumber) {
			fetchDeposits();
		}
	}, [accountNumber]);
	
	return { deposits, accountNumber, loading, error };
};
