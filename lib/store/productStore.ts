import { create } from "zustand";
import { Product } from "@/lib/types";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  loadProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  loadProducts: async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      set({ products: data.products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  },
}));
