import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  };
}

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  // Todo: verify order
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000]">
        <Title title={`Order: #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                { "bg-red-500": false, "bg-green-700": true },
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Paid</span>
            </div>
            {/* Items */}
            {productInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>Ciudad de México</p>
              <p>CP 12345</p>
              <p>123.123.123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Sub-total</span>
              <span className="text-right">$ 100</span>

              <span>Sales tax (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  { "bg-red-500": false, "bg-green-700": true },
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pending payment</span> */}
                <span className="mx-2">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
