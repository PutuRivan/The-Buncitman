"use server";

import prisma from "../db";

export async function getSearchQuery(searchQuery: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery, // Mencari yang mengandung kata kunci
        mode: "insensitive",   // Tidak case-sensitive
      },
    },
    orderBy: {
      name: "asc", // Mengurutkan hasil berdasarkan nama
    },
  });

  return products;
}
