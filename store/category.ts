import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectOptions {
    contractor: string;
    account: string;
    card: {
        id: string;
        name: string;
    };
}

interface SelectStore {
    selectedOptions: SelectOptions;
    setContractor: (contractor: string) => void;
    setAccount: (account: string) => void;
    setCard: (card: { id: string; name: string }) => void; // Модифицировано
    clearSelections: () => void;
}

export const useSelectStore = create(
    persist<SelectStore>(
        (set) => ({
            selectedOptions: {
                contractor: '',
                account: '',
                card: {
                    id: '',
                    name: ''
                },
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
                    selectedOptions: { ...state.selectedOptions, card }, // Теперь сохраняем и id, и name
                })),
            clearSelections: () =>
                set(() => ({
                    selectedOptions: {
                        contractor: '',
                        account: '',
                        card: { id: '', name: '' },
                    },
                })),
        }),
        {
            name: 'select-store',
        }
    )
);
