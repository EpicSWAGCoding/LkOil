'use client'

import { useState } from 'react';

export const useFetchCardData = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	const fetchData = async (url: string): Promise<any> => {
		setLoading(true);
		setError(null);
		
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error('Ошибка загрузки данных');
			return await response.json();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
			return null;
		} finally {
			setLoading(false);
		}
	};
	
	return { loading, error, fetchData };
};
