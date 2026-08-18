import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithPagination } from "@/actions";
import { Pagination, Title } from "@/components";
import Image from "next/image";
import { currencyFormat } from "../../../../utils/currencyFormat";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function ProductPage({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithPagination({
      page: Number(page),
      take: Number(take),
    });

  return (
    <>
      <Title title="Products Management" />
      <div className="flex justify-end mb-10">
        <Link href="/admin/products/new" className="btn-primary uppercase">
          Create a new product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b border-gray-400">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-gray-400 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={`/products/${product.images[0]}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded object-cover"
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
