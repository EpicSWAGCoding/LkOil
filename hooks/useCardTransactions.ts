'use client'

import { useEffect, useReducer } from 'react';

interface Transaction {
	id: number;
	card: {
		cardNumber: string;
	};
	transactionDate: string;
	gasStation: string;
	total: number;
	currencyType: string;
}

interface State {
	transactionsData: Transaction[];
	loading: boolean;
	error: string | null;
	cardNumber: string | null;
}

type Action =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: Transaction[] }
	| { type: 'FETCH_ERROR'; payload: string }
	| { type: 'SET_CARD_NUMBER'; payload: string };

const initialState: State = {
	transactionsData: [],
	loading: false,
	error: null,
	cardNumber: null,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, loading: true, error: null };
		case 'FETCH_SUCCESS':
			return { ...state, transactionsData: action.payload, loading: false };
		case 'FETCH_ERROR':
			return { ...state, error: action.payload, loading: false };
		case 'SET_CARD_NUMBER':
			return { ...state, cardNumber: action.payload };
		default:
			return state;
	}
};

export const useCardTransactions = (cardId: string | null) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { transactionsData, loading, error, cardNumber } = state;
	
	const fetchData = async (url: string) => {
		dispatch({ type: 'FETCH_START' });
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error('Ошибка загрузки данных');
			const data = await response.json();
			return data;
		} catch (err) {
			dispatch({ type: 'FETCH_ERROR', payload: err instanceof Error ? err.message : 'Неизвестная ошибка' });
			return null;
		}
	};
	
	useEffect(() => {
		const fetchCardNumber = async () => {
			const data = await fetchData('/api/select-data');
			if (data?.cards) {
				const card = data.cards.find((c: { id: number }) => c.id === Number(cardId));
				if (card) {
					dispatch({ type: 'SET_CARD_NUMBER', payload: card.cardNumber });
				} else {
					dispatch({ type: 'FETCH_ERROR', payload: 'Карта не найдена' });
				}
			}
		};
		
		if (cardId) fetchCardNumber();
	}, [cardId]);
	
	useEffect(() => {
		const fetchTransactions = async () => {
			if (!cardNumber) return;
			const data = await fetchData(`/api/transactions?cardNumber=${cardNumber}`);
			if (data) {
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			}
		};
		
		if (cardNumber) fetchTransactions();
	}, [cardNumber]);
	
	return { transactionsData, loading, error, cardNumber };
};
