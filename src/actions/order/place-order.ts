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

  // Totals tax, subtotal and total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} not found - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    {
      subTotal: 0,
      tax: 0,
      total: 0,
    },
  );

  console.log({ subTotal, tax, total });
  // Create the database transaction
  console.log({ address });
  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. Update product stock
    // 2. Create order: header and details
    const order = await tx.order.create({
      data: {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        orderItems: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ??
                0,
            })),
          },
        },
      },
    });
    // 3. Create order address
    const orderAddress = await tx.orderAddress.create({
      data: {
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2,
        postalCode: address.postalCode,
        city: address.city,
        phone: address.phone,
        countryId: address.country,
        orderId: order.id,
      },
    });

    return {
      order,
      updatedProducts: [],
      orderAddress,
    };
  });
};
