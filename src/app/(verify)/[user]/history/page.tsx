"use client";

import HistoryTable from "@/components/history/history-table";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Assuming you are using next-auth for session management

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  given_names: string;
  email: string;
}

interface Invoice {
  amount: number;
  items: Item[] | undefined; // items can be undefined
  paid_at: string;
  payment_channel: string;
  status: string;
  customer: Customer;
}

const HistoryPage = () => {
  const { data: session } = useSession(); // Get the current session
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_XENDIT_URL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.NEXT_PUBLIC_XENDIT_API_KEY}`,
          },
        });

        const data = await response.json();

        // Ensure data is in the correct format before setting state
        if (Array.isArray(data)) {
          setInvoice(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter invoices based on status and user
  const filteredInvoices = invoice.filter((item) => {
    const matchesStatus =
      filterStatus === "" || item.status.toLowerCase() === filterStatus.toLowerCase();
    
    const matchesUser =
      !session ||
      item.customer.email.toLowerCase() === session.user?.email?.toLowerCase(); // Filter by session user email

    return matchesStatus && matchesUser && item.items && item.items.length > 0;
  });

  return (
    <section className="flex flex-col gap-5 p-10">
      <header>
        <h1>Payment History</h1>
      </header>

      <div className="flex justify-end w-full">
        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="settled">Settled</option>
        </select>
      </div>

      <div className="w-full flex justify-center">
        <HistoryTable data={filteredInvoices} />
      </div>
    </section>
  );
};

export default HistoryPage;
