"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { subTotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation()),
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log({ address, productsToOrder });
    // TODO: Server Action

    setIsPlacingOrder(false);
  };

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />

      <h2 className="text-2xl mb-2 font-bold">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 item" : `{itemsInCart} items`}
        </span>

        <span>Sub-total</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Sales tax (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            By clicking on {"Place order"}, you agree to our{" "}
            <a href="#" className="underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacity Policy
            </a>
          </span>
        </p>
        {/* <p className="text-red-500 mb-2">Error or creation failed</p> */}
        <button
          // href="/orders/1234"
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary flex justify-center": !isPlacingOrder,
            "btn-disabled flex justify-center": isPlacingOrder,
          })}
        >
          Place order
        </button>
      </div>
    </div>
  );
};
