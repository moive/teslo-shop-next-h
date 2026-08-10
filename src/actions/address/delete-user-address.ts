"use server";

import { prisma } from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleteAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      message: "Address deleted successfully.",
      address: deleteAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error deleting the address in the database.",
    };
  }
};
