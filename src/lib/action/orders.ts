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

  if (!ExistingCart) return new Error("Cart not found");

  if (ExistingCart) {
    for (const item of ExistingCart) {
      await prisma.orders.updateMany({
        data: {
          userId: user.id, // Use userId instead of user
          productId: item.product.id, // Use productId from the cartItem
          quantity: item.quantity,
          totalAmount: item.product.price * item.quantity, // Example total amount
          status: "pending",
        },
      });
    }
  }
  for (const item of ExistingCart) {
    await prisma.orders.createMany({
      data: {
        userId: user.id, // Use userId instead of user
        productId: item.product.id, // Use productId from the cartItem
        quantity: item.quantity,
        totalAmount: item.product.price * item.quantity, // Example total amount
        status: "pending",
      },
    });
  }

  const deleteCart = await prisma.cartItem.deleteMany({
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

  return deleteCart;
}

interface UpdateOrder {
  id: string;
  quantity: number;
}

export async function updateOrder({ id, quantity }: UpdateOrder) {
  const orders = await prisma.orders.findUnique({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  });

  if (!orders) {
    throw new Error("Order not found");
  }

  const data = await prisma.orders.update({
    where: {
      id: id,
    },
    data: {
      quantity: orders.product.price * quantity,
    },
  });

  return data;
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
