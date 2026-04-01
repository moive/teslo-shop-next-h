"use client";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      try {
        const response = await fetch(`/api/stock/${slug}`);
        const { stock } = await response.json();
        setStock(stock);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setLoading(false);
      }
    };
    getStock();
  }, [slug]);

  return (
    <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
      Stock: {loading ? "Loading..." : stock}
    </h2>
  );
};
