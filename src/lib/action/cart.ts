"use server";

import prisma from "../db";

interface getCart {
  username: string;
}

export async function getAllCarts({ username }: getCart) {
  const data = await prisma.cartItem.findMany({
    where: {
      user: {
        name: username,
      },
    },
    include: {
      product: true,
      user: true,
    },
  });

  // console.log(data);
  return data;
}

interface PostCarts {
  ProductName: string;
  username: string;
  quantity: number;
}

export async function postCarts({
  ProductName,
  username,
  quantity,
}: PostCarts) {
  try {
    const exitingUser = await prisma.cartItem.findFirst({
      where: {
        user: {
          name: username,
        },
        product: {
          name: ProductName,
        },
      },
      include: {
        product: true,
        user: true,
      },
    });

    console.log({ exitingUser: exitingUser });

    if (exitingUser) {
      const updateCartItem = await prisma.cartItem.update({
        where: {
          id: exitingUser.id,
        },
        data: {
          quantity: exitingUser.quantity + quantity,
        },
      });
      return updateCartItem;
    } else {
      const product = await prisma.product.findFirst({
        where: {
          name: ProductName,
        },
      });
      
      const newCartItem = await prisma.cartItem.create({
        data: {
          quantity: quantity,
          user: {
            connect: {
              name: username,
            },
          },
          product: {
            connect: {
              id: product?.id,
            },
          },
        },
      });
      return newCartItem;
    }
  } catch (error) {
    return error;
  }
}

interface updateItem {
  id: string;
  quantity: number;
}

export async function updateItem({ id, quantity }: updateItem) {
  const data = await prisma.cartItem.update({
    where: {
      id: id,
    },
    data: {
      quantity: quantity,
    },
  });

  return data;
}

export async function deleteItem(id: string) {
  const data = await prisma.cartItem.delete({
    where: {
      id: id,
    },
  });

  return data;
}
