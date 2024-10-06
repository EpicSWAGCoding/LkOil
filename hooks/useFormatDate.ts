export const formatDate = (date: string) => new Date(date).toLocaleDateString('ru-RU', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});