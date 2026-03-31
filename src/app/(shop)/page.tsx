import { getPaginatedProductsWithPagination } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithPagination({
      page: Number(page),
      take: Number(take),
    });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
