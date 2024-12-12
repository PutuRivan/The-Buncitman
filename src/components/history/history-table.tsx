"use client";

import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Invoice {
  amount: number;
  items: Item[] | undefined; // items can be undefined
  paid_at: string;
  payment_channel: string;
  status: string;
}

interface Props {
  data: Invoice[];
}

const HistoryTable = ({ data }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Payment Method</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5}>No invoices with products found</td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index}>
              <td>{formatDate(item.paid_at)}</td>
              <td>
                {item.items && item.items.length > 0
                  ? item.items[0].name
                  : "No product"}
              </td>
              <td>{item.payment_channel}</td>
              <td>{formatPrice(item.amount)}</td>
              <td>{item.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default HistoryTable;
