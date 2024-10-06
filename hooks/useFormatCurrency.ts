export const formatCurrency = (amount: number, currencyType: string): string => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: currencyType,
	}).format(amount);
};