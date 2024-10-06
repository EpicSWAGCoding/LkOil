import { useEffect, useState } from 'react';

const useFetchCardsLimit = (inn: string, accountNumber: string) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
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
				setError('Failed to fetch cards');
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
