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

  const ExistingOrders = await prisma.orders.findMany({
    where: {
      user: {
        name: username,
      },
    },
    include: {
      product: true,
    },
  });


  if (ExistingOrders.length === 0) {
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
  } else {
    for (const item of ExistingOrders) {
      for (const cartItem of ExistingCart) {
        if (cartItem.product.name === item.product.name) {
          await prisma.orders.updateMany({
            where: {
              id: item.id,
            },
            data: {
              quantity: item.quantity + cartItem.quantity,
              totalAmount:
                item.product.price * (item.quantity + cartItem.quantity),
            },
          });
        }
      }
    }
  }


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
      quantity: quantity,
      totalAmount: orders.product.price * quantity,
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
