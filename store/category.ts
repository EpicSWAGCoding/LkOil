import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectOptions {
    contractor: string;
    account: string;
    card: string;
}

interface SelectStore {
    selectedOptions: SelectOptions;
    setContractor: (contractor: string) => void;
    setAccount: (account: string) => void;
    setCard: (card: string) => void;
    clearSelections: () => void; // Добавьте этот метод
}

export const useSelectStore = create(
    persist<SelectStore>(
        (set) => ({
            selectedOptions: {
                contractor: '',
                account: '',
                card: '',
            },
            setContractor: (contractor) =>
                set((state) => ({
                    selectedOptions: { ...state.selectedOptions, contractor },
                })),
            setAccount: (account) =>
                set((state) => ({
                    selectedOptions: { ...state.selectedOptions, account },
                })),
            setCard: (card) =>
                set((state) => ({
                    selectedOptions: { ...state.selectedOptions, card },
                })),
            clearSelections: () =>
                set(() => ({
                    selectedOptions: { contractor: '', account: '', card: '' },
                })),
        }),
        {
            name: 'select-store',
        }
    )
);
