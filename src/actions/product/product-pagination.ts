"use server";

import { Gender } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithPagination = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender,
      },
    });

    const totals = await prisma.product.count({
      where: {
        gender,
      },
    });
    const totalPages = Math.ceil(totals / take);

    return {
      currentPage: page,
      totals,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImages.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Error fetching paginated products: " + error);
  }
};
