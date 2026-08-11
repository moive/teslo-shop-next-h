"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth.config";

import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;
  // User session verification
  if (!userId)
    return {
      ok: false,
      message: "User not found in session",
    };

  // Get products information
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate amounts

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  console.log({ itemsInOrder });
};
