"use server";

import { prisma } from "@/lib/prisma";

export const getPaginatedProductsWithPagination = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map((product) => ({
        ...product,
        images: product.productImages.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Error fetching paginated products: " + error);
  }
};
