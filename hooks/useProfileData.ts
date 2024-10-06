'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useProfileData = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	
	const fetchProfile = async () => {
		try {
			const response = await fetch('/api/profile');
			if (!response.ok) {
				throw new Error('Ошибка загрузки профиля');
			}
			const data = await response.json();
			setUsername(data.profile.username);
		} catch (error) {
			console.error('Ошибка при получении профиля:', error);
			toast({
				title: "Ошибка",
				description: "Не удалось загрузить профиль",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		fetchProfile();
	}, []);
	
	return { username, loading };
};
