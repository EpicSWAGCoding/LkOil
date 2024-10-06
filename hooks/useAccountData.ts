'use client'

import { useCallback, useEffect, useState } from 'react';

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

export const useAccountData = (accountId: string | null) => {
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	const fetchAccountData = useCallback(async () => {
		if (!accountId) {
			setSelectedAccount(null);
			return;
		}
		
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
			setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
		} finally {
			setLoading(false);
		}
	}, [accountId]);
	
	useEffect(() => {
		fetchAccountData();
	}, [fetchAccountData]);
	
	return { selectedAccount, loading, error, refetch: fetchAccountData };
};