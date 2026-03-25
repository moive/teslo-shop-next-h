"use client";

import clsx from "clsx";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex">
      <button
        disabled={count <= 1}
        onClick={() => onQuantityChanged(-1)}
        className={clsx("", {
          "text-gray-300 cursor-not-allowed": count <= 1,
          "cursor-pointer": count > 1,
        })}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button
        className={clsx("", {
          "text-gray-300 cursor-not-allowed": count > 4,
          "cursor-pointer": count <= 4,
        })}
        disabled={count > 4}
        onClick={() => onQuantityChanged(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
