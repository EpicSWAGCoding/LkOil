import { useEffect, useState } from 'react';

const useFetchCardsLimit = (inn: string, accountNumber: string) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		const fetchCards = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/cards?inn=${inn}&accountNumber=${accountNumber}`);
				const data = await response.json();
				if (response.ok) {
					setCards(data);
				} else {
					setError(data.error);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
			} finally {
				setLoading(false);
			}
		};
		
		if (inn && accountNumber) {
			fetchCards();
		}
	}, [inn, accountNumber]);
	
	return { cards, loading, error };
};
