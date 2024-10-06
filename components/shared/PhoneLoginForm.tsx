'use client'

import { Button, Input } from '@/components/ui';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { usePhoneAuth } from '@/hooks';

export const PhoneLoginForm: FC = ({ loading }) => {
	
	const {
		phoneNumber,
		smsCode,
		phoneError,
		loading: phoneLoading,
		isSmsSent,
		handlePhoneChange,
		setSmsCode,
		handleSendSms,
		handleVerifySms,
	} = usePhoneAuth();
	
	const router = useRouter();
	
	
	const handlePhoneSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isSmsSent) {
			handleSendSms();
		} else {
			handleVerifySms();
		}
	};
	
	return (
		<form onSubmit={handlePhoneSubmit} className="space-y-4">
			<div>
				<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
					Номер телефона
				</label>
				<Input
					id="phoneNumber"
					className="mt-1"
					placeholder="+7 (000) 000-00-00"
					value={phoneNumber}
					onChange={handlePhoneChange}
					disabled={isSmsSent}
				/>
			</div>
			
			{isSmsSent && (
				<div>
					<label htmlFor="smsCode" className="block text-sm font-medium text-gray-700">
						Код из SMS
					</label>
					<Input
						id="smsCode"
						type="text"
						value={smsCode}
						onChange={(e) => setSmsCode(e.target.value)}
						className="mt-1"
						placeholder="0000"
					/>
				</div>
			)}
			
			{phoneError && <div className="text-red-500">{phoneError}</div>}
			
			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? 'Загрузка...' : (isSmsSent ? 'Войти' : 'Получить код')}
			</Button>
		</form>
	);
};
