import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
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
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();

        const udpatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: udpatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const udpatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );

        set({ cart: udpatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    },
  ),
);
