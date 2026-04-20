"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currentFormat } from "@/utils";
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation()),
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 item" : `{itemsInCart} items`}
      </span>

      <span>Sub-total</span>
      <span className="text-right">{currentFormat(subTotal)}</span>

      <span>Sales tax (15%)</span>
      <span className="text-right">{currentFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currentFormat(total)}</span>
    </div>
  );
};
