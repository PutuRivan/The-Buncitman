"use server";

import prisma from "../db";

export async function getAddresses(username: string) {
  const data = await prisma.addresses.findMany({
    where: {
      user: {
        name: username,
      },
    },
    include: {
      user: true,
    },
  });

  return data;
}
