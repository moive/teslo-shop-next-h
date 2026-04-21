import "dotenv/config";
import { prisma } from "../../src/lib/prisma";
import { initialData } from "./seed";

async function main() {
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

  // Categories
  // {
  //   name: "Shirts",
  // }
  const catergoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({ data: catergoriesData });

  const categoriesDb = await prisma.category.findMany();
  const categoriesMap = categoriesDb.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  ); // <string=shirts, string=categoryID>

  // Products
  // const { images, type, ...product1 } = products[0]!;
  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap["shirts"]!,
  //   },
  // });

  for (const { images, type, ...product } of products) {
    const prodDB = await prisma.product.create({
      data: {
        ...product,
        categoryId: categoriesMap[type]!,
      },
    });
    // Images
    const imagesDb = images.map((image) => ({
      url: image,
      productId: prodDB.id!,
    }));

    await prisma.productImage.createMany({ data: imagesDb });
  }

  console.log("Seed Executed");
}

(async () => {
  if (process.env.NODE_ENV === "production") return;
  try {
    await main();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
