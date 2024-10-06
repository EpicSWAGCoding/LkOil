export const useFormatCardNumber = (cardNumber: string) => {
	return cardNumber.replace(/\d{4}(?=\d)/g, '$& ');
};