import prisma from "../db";

export async function getAllProducts(name: string) {
  return await prisma.productCategories.findMany({
    where: {
      category: { name },
    },
    include: {
      category: true,
      product: true,
    },
  });
}
