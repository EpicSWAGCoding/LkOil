'use client';

import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export const useLogout = () => {
	const router = useRouter();
	
	const handleLogout = async () => {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
			});
			if (response.ok) {
				router.push('/auth');
				toast({
					title: "Выход",
					description: "Вы успешно вышли из системы",
				});
			} else {
				throw new Error('Не удалось выйти из системы');
			}
		} catch (error) {
			console.error('Ошибка при выходе:', error);
			toast({
				title: "Ошибка",
				description: error instanceof Error ? error.message : "Произошла ошибка при выходе из системы",
				variant: "destructive",
			});
		}
	};
	
	return { handleLogout };
};
