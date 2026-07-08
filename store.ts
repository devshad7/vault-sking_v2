import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SyncStatus = "guest" | "synced";

interface StoreState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  items: CartItem[];
  addItem: (product: Product) => void;
  setItem: (items: CartItem[]) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  //   // favorite
  favoriteProduct: Product[];
  setFavorite: (products: Product[]) => void;
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      syncStatus: "guest",
      setSyncStatus: (status) => set({ syncStatus: status }),
      items: [],
      favoriteProduct: [],
      setFavorite: (products) => set({ favoriteProduct: products }),

      setItem: (items) => set({ items }),
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),
      resetCart: () => set({ items: [] }),
      // Original total before discount
      getSubTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      // Final total after discount
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const finalPrice =
            (item.product.price ?? 0) - (item.product.discount ?? 0);

          return total + finalPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,

      addToFavorite: (product: Product) =>
        set((state) => {
          const isFavorite = state.favoriteProduct.some(
            (item) => item._id === product._id
          );

          return {
            favoriteProduct: isFavorite
              ? state.favoriteProduct.filter(
                (item) => item._id !== product._id
              )
              : [...state.favoriteProduct, product],
          };
        }),
      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "cart-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useStore;