import { Title, ProductGrid } from "@/components";
import { initialData, Category } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = initialData.products.filter((p) => p.gender === id);

  const labels: Record<Category, string> = {
    men: "Men",
    women: "Women",
    kid: "Kids",
    unisex: "Unisex",
  };
  if (products.length === 0) notFound();

  return (
    <>
      <Title
        title={`Store of ${labels[id]}`}
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
