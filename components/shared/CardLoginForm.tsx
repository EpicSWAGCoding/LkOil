'use client'

import { Button, Input } from '@/components/ui';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useCardAuth } from '@/hooks';

export const CardLoginForm: FC = () => {
	
	const {
		cardNumber,
		password,
		error,
		loading,
		handleCardNumberChange,
		setPassword,
		handleSubmit,
	} = useCardAuth();
	
	const router = useRouter();
	
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
					Номер топливной карты
				</label>
				<Input
					id="cardNumber"
					className="mt-1"
					placeholder="0000 0000 0000 0000"
					value={cardNumber}
					onChange={handleCardNumberChange}
				/>
			</div>
			
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Пароль
				</label>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="mt-1"
					placeholder="*********"
				/>
			</div>
			
			{error && <div className="text-red-500">{error}</div>}
			
			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? 'Загрузка...' : 'Войти'}
			</Button>
		</form>
	);
};
