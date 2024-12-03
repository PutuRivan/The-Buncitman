"use server";

import prisma from "../db";

export async function getAllProducts(name : string) {
  return await prisma.productCategories.findMany({
    where: {
      category:{
        name: name
      }
    },
    include: {
      category: true,
      product: true,
    },
  });
}

export async function getProductDetails(name: string) {
  const data = await prisma.product.findFirst({
    where: {
      name: name,
    },
  });

  // console.log(data)

  return data;
}
