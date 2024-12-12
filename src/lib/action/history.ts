"use server";

export async function getHistory() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_XENDIT_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_XENDIT_API_KEY}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();
  return data;
}
