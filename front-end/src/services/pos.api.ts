import type { CartItem, Product } from "../types/pos";

// 🧾 get products
export const getProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/products`);

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
};

export const getStock = async () => {
    const res = await fetch(`http://localhost:3000/api/stock`);
    if (!res.ok) throw new Error("Failed to fetch stock");

    return res.json();
};

export const getProduct = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");

    return res.json();
};

export const addProduct = async (data: Product) => {
    const res = await fetch(`http://localhost:3000/api/products/add-product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to add product");

    return res.json();
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update product");

    return res.json();
}

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

export const getLedgerFromToWhere = async (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const res = await fetch(`http://localhost:3000/api/ledger?${params}`);
    if (!res.ok) throw new Error("Failed to fetch ledger");
    return res.json();
};