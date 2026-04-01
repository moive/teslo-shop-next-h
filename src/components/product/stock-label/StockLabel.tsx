"use client";
import { titleFont } from "@/config/fonts";
import { sleep } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      try {
        await sleep(3);
        const response = await fetch(`/api/stock/${slug}`);
        const { stock } = await response.json();
        setStock(stock);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h2
          className={`${titleFont.className} antialiased font-bold text-lg animae-pulse bg-gray-200`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {isLoading ? "Loading..." : stock}
        </h2>
      )}
    </>
  );
};
