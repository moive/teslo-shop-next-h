import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  hydrate: boolean;
  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  setHydrate: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      hydrate: false,
      setHydrate: () => set({ hydrate: true }),
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, product) => total + product.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const udpatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: udpatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
      onRehydrateStorage: () => (state) => {
        state?.setHydrate();
      },
    },
  ),
);
