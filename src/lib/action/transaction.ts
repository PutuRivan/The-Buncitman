"use server";

interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface CreateInvoiceParams {
  orders: OrderItem[]; // Array of order items
  total: number; // Total price of the order
  email: string; // Customer email
  username: string; // Customer name
  selectedShipping: string; // Selected shipping method
  shippingFee: number; // Shipping fee value
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
              city: "Jakarta Selatan",
              country: "Indonesia",
              postal_code: "12345",
              street_line1: "Jalan Makan",
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
    return result;
  } catch (error) {
    console.error("Error creating invoice", error);
    throw error; // Rethrow error untuk penanganan lebih lanjut
  }
}
