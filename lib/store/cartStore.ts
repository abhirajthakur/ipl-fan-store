import { create } from 'zustand';

interface CartStore {
    cartItemCount: number;
    setCartItemCount: (count: number) => void;
    incrementCartCount: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartItemCount: 0,
    setCartItemCount: (count) => set({ cartItemCount: count }),
    incrementCartCount: () => set((state) => ({ cartItemCount: state.cartItemCount + 1 })),
}));