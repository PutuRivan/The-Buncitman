"use server";

import { deleteOrders } from "./orders";

interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

// interface Address {
//   name: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }

interface CreateInvoiceParams {
  orders: OrderItem[]; // Array of order items
  total: number; // Total price of the order
  email: string; // Customer email
  username: string; // Customer name
  selectedShipping: string; // Selected shipping method
  shippingFee: number; // Shipping fee value
  // Addresses: Address[];
}

export async function createInvoice({
  orders,
  total,
  email,
  username,
  selectedShipping,
  shippingFee,
}: CreateInvoiceParams) {
  try {
    const items = orders.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // const address = Addresses.map((item) => ({
    //   name: item.name,
    //   phone: item.phone,
    //   street: item.street,
    //   city: item.city,
    //   state: item.state,
    //   postalCode: item.postalCode,
    //   country: item.country,
    // }));

    const response = await fetch(`${process.env.NEXT_PUBLIC_XENDIT_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_XENDIT_API_KEY}`,
      },
      body: JSON.stringify({
        external_id: `invoice-${Date.now()}`,
        amount: total,
        payer_email: email,
        customer: {
          given_names: username,
          email: email,
          addresses: [
            {
              city: "Pamulang",
              state: "Banten",
              postal_code: "15435",
              country: "Indonesia",

              street_line1: "Jl Mahoni",
            },
          ],
        },
        customer_notification: {
          invoice_created: ["whatsapp", "email", "viber"],
          invoice_reminder: ["whatsapp", "email", "viber"],
          invoice_paid: ["whatsapp", "email", "viber"],
        },
        success_redirect_url: "https://the-buncitman.vercel.app",
        // failure_redirect_url: "https://your-website.com/failed",
        currency: "IDR",
        items: items, // Tambahkan items dinamis
        fees: [
          {
            type: selectedShipping,
            value: shippingFee,
          },
        ],
        payment_methods: ["OVO", "DANA", "SHOPEEPAY", "LINKAJA", "QRIS"],
      }),
    });

    const result = await response.json();

    if (response.ok) {
      await deleteOrders(username);
    }

    return result;
  } catch (error) {
    console.error("Error creating invoice", error);
    throw error; // Rethrow error untuk penanganan lebih lanjut
  }
}
