import type { CartItem } from "../types/pos";

// 🧾 get products
export const getProducts = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
};

// 💸 checkout
export const checkout = async (cart: CartItem[]) => {
  const res = await fetch(`http://localhost:3000/products/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart: cart.map((c) => ({
        products_id: c.products_id,
        qty: c.qty,
      })),
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Checkout failed");

  return data;
};