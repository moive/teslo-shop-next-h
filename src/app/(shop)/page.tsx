import { getPaginatedProductsWithPagination } from "@/actions";
import { ProductGrid, Title } from "@/components";

export default async function Home() {
  const { products } = await getPaginatedProductsWithPagination();

  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
}
