"use server";

import prisma from "../db";

interface ProductType {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export async function getSearchQuery(
  searchQuery: string
): Promise<ProductType[]> {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery, // Mencari yang mengandung kata kunci
        mode: "insensitive", // Tidak case-sensitive
      },
    },
    orderBy: {
      name: "asc", // Mengurutkan hasil berdasarkan nama
    },
  });

  return products;
}
