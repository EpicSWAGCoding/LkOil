'use client'

import { useState } from 'react';

export const useCarNumber = (initialValue: string = '') => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string | null>(null);
	
	const formatCarNumber = (input: string): string => {
		const cleaned = input.toUpperCase().replace(/[^А-Я0-9]/g, '');
		const match = cleaned.match(/^([А-Я]{0,1})(\d{0,3})([А-Я]{0,2})(\d{0,3})$/);
		
		if (!match) return cleaned;
		
		const [, first, numbers1, letters, numbers2] = match;
		
		let formatted = first || '';
		if (numbers1) formatted += numbers1;
		if (letters) formatted += letters;
		if (numbers2) formatted += numbers2;
		
		return formatted;
	};
	
	const handleChange = (input: string) => {
		const formatted = formatCarNumber(input);
		setValue(formatted);
		
		if (formatted.length === 9) {
			setError(null);
		} else if (formatted.length > 0) {
			setError('Номер должен быть в формате А000АА000');
		} else {
			setError(null);
		}
	};
	
	return { value, error, handleChange };
};
