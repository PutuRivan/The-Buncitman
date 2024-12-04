"use server";

import prisma from "../db";

interface getCart {
  username: string;
}
export async function getAllOrders({ username }: getCart) {
  const data = await prisma.orders.findMany({
    where: {
      user: {
        name: username,
      },
    },
    include: {
      user: true,
      product: true,
    },
  });
  // console.log(data);
  return data;
}

interface PostOrder {
  username: string;
  productName: string;
}

export async function postAllOrders({ username }: PostOrder) {
  const user = await prisma.users.findUnique({
    where: {
      name: username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const ExistingCart = await prisma.cartItem.findMany({
    where: {
      user: {
        name: username,
      },
    },
    include: {
      product: true,
    },
  });

  const order = await prisma.orders.createMany({
    data: ExistingCart.map((item) => ({
      userId: user.id, // Use userId instead of user
      productId: item.product.id, // Use productId from the cartItem
      quantity: item.quantity,
      totalAmount: item.product.price * item.quantity, // Example total amount
      status: "pending",
    })),
  });

  await prisma.cartItem.deleteMany({
    where: {
      user: {
        name: username,
      },
      product: {
        id: {
          in: ExistingCart.map((item) => item.product.id),
        },
      },
    },
  });

  return order;
}

interface DeleteOrder {
  id: string;
}

export async function deleteItem({ id }: DeleteOrder) {
  const ordersData = await prisma.orders.delete({
    where: {
      id: id,
    },
  });

  return ordersData;
}
