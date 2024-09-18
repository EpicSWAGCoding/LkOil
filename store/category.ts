import { create } from 'zustand';

export const useSelectStore = create((set) => ({
    selectedOptions: {
        contractor: null,
        account: null,
        card: null,
    },
    setContractor: (value) => set((state) => ({
        selectedOptions: { ...state.selectedOptions, contractor: value }
    })),
    setAccount: (value) => set((state) => ({
        selectedOptions: { ...state.selectedOptions, account: value }
    })),
    setCard: (value) => set((state) => ({
        selectedOptions: { ...state.selectedOptions, card: value }
    })),
}));
