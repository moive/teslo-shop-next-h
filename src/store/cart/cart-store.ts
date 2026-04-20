import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

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
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal: number = cart.reduce(
          (subtotal: number, product) =>
            product.quantity * product.price + subtotal,
          0,
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart: number = cart.reduce(
          (total: number, item) => total + item.quantity,
          0,
        );
        return { subTotal, tax, total, itemsInCart };
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
