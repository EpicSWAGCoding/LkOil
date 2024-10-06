'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const usePhoneAuth = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isSmsSent, setIsSmsSent] = useState(false);
	const [smsCode, setSmsCode] = useState('');
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const cleanValue = value.replace(/[^+\d]/g, '').slice(0, 12);
		setPhoneNumber(cleanValue);
	};
	
	const handleSendSms = async () => {
		setLoading(true);
		setPhoneError(null);
		
		try {
			const response = await fetch('/api/send-sms', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ phoneNumber }),
			});
			
			const data = await response.json();
			if (data.success) {
				setIsSmsSent(true);
			} else {
				setPhoneError(data.message || 'Ошибка отправки SMS');
			}
		} catch (error: any) {
			setPhoneError('Ошибка подключения к серверу: ' + error.message);
		} finally {
			setLoading(false);
		}
	};
	
	const handleVerifySms = async () => {
		setLoading(true);
		setPhoneError(null);
		
		try {
			const response = await fetch('/api/verify-sms', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ phoneNumber, smsCode }),
			});
			
			const data = await response.json();
			if (data.success) {
				router.push('/');
			} else {
				setPhoneError(data.message || 'Неверный код подтверждения');
			}
		} catch (error: any) {
			setPhoneError('Ошибка подключения к серверу: ' + error.message);
		} finally {
			setLoading(false);
		}
	};
	
	return {
		phoneNumber,
		smsCode,
		phoneError,
		loading,
		isSmsSent,
		handlePhoneChange,
		setSmsCode,
		handleSendSms,
		handleVerifySms,
	};
};
