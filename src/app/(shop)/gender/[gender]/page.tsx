import { getPaginatedProductsWithPagination } from "@/actions";
import { Title, ProductGrid, Pagination } from "@/components";
import { Gender } from "@/generated/prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const search = await searchParams;

  const page = search?.page ? parseInt(search.page!) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithPagination({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "Men",
    women: "Women",
    kid: "Kids",
    unisex: "Unisex",
  };

  // if (products.length === 0) notFound();

  return (
    <>
      <Title
        title={`Store of ${labels[gender]}`}
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
