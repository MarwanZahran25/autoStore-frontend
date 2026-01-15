import { create } from "zustand";
import { persist } from "zustand/middleware";

type TransactionSchema = {
  receiptId?: number | undefined;
  productId?: number | undefined;
  pricePerUnit?: number | undefined;
  quantity?: number | undefined;
  name?: string | undefined;
  brand?: string | undefined;
}

type productList = TransactionSchema[];

type reciptStore = {
  products: productList;
  addEntry: (entry: TransactionSchema) => void;
  resetRecipt: () => void;
};
const useReciptStore = create<reciptStore>((set) => ({
  products: [],
  addEntry: (entry) => {
    set((state) => ({ products: [...state.products, entry] }));
  },
  resetRecipt: () => {
    set(() => ({ products: [] }));
  },
}));

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage",
    }
  )
);

export { useReciptStore, useAuthStore };
