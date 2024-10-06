'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useCardAuth = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	
	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const cleanValue = value.replace(/\D/g, '').slice(0, 16);
		const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
		setCardNumber(formattedValue);
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		const cleanCardNumber = cardNumber.replace(/\s/g, '');
		
		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login: cleanCardNumber, password }),
			});
			
			const data = await response.json();
			if (data.success) {
				router.push('/');
			} else {
				setError(data.message || 'Ошибка авторизации');
			}
		} catch (error: any) {
			setError('Ошибка подключения к серверу: ' + error.message);
		} finally {
			setLoading(false);
		}
	};
	
	return {
		cardNumber,
		password,
		error,
		loading,
		handleCardNumberChange,
		setPassword,
		handleSubmit,
	};
};
