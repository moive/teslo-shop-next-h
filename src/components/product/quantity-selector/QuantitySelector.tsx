"use client";

import clsx from "clsx";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantitySelect: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantitySelect }: Props) => {
  // const [count, setCount] = useState(quantity);

  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantitySelect(quantity + value);
  };

  return (
    <div className="flex">
      <button
        disabled={quantity <= 1}
        onClick={() => onValueChanged(-1)}
        className={clsx("", {
          "text-gray-300 cursor-not-allowed": quantity <= 1,
          "cursor-pointer": quantity > 1,
        })}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button
        className={clsx("", {
          "text-gray-300 cursor-not-allowed": quantity > 4,
          "cursor-pointer": quantity <= 4,
        })}
        disabled={quantity > 4}
        onClick={() => onValueChanged(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
