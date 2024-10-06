export const formatPhoneNumber = (phoneNumber: string) => {
	// Убираем все символы, кроме цифр
	const cleaned = phoneNumber.replace(/\D/g, '');
	
	// Форматируем в нужный формат
	return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
};