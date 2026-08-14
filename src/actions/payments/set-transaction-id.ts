"use server";

import { prisma } from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string,
) => {
  try {
    const orderUpdate = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!orderUpdate)
      return {
        ok: false,
        message: `Order with id: ${orderId} not found.`,
      };

    return {
      ok: true,
      message: "Transaction ID saved successfully.",
      order: orderUpdate,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error the save the address in the database.",
    };
  }
};
