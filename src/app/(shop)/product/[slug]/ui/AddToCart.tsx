"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import type { IProduct, Size } from "@/interfaces";

interface Props {
  product: IProduct;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const onAddToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({ size, quantity });
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500"> You must select a size *</span>
      )}
      {/* Selectors Size */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeSelect={setSize}
      />
      {/* Selectors quantity */}
      <QuantitySelector quantity={quantity} onQuantitySelect={setQuantity} />
      {/* button */}
      <button onClick={onAddToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
