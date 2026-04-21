import type { CartItem } from "../types/pos";

// 🧾 get products
export const getProducts = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
};

// 💸 checkout
export const checkout = async (cart: CartItem[]) => {
  const res = await fetch(`http://localhost:3000/api/pos/checkout`, {
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

//Product Price Management
export const updateProductPrice = async (
  id: string,
  price: number,
  token: string
) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ price })
  });

  if (!res.ok) throw new Error("Failed to update");

  return res.json();
};