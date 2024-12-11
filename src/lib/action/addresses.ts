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

interface PostAddress {
  username: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function postAddress({
  username,
  name,
  phone,
  street,
  city,
  state,
  postalCode,
  country,
}: PostAddress) {
  const data = await prisma.addresses.create({
    data: {
      user: {
        connect: {
          name: username,
        },
      },
      name,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
    },
  });

  return data;
}

export async function deleteAddress(id: string) {
  const data = await prisma.addresses.delete({
    where: {
      id: id,
    },
  });

  return data;
}
