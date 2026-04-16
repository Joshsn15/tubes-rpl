import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { getProducts, checkout } from "../services/pos.api";
import type { Product, CartItem } from "../types/pos";
const POS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔥 load products
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // ➕ add to cart
  const addToCart = (product: Product) => {
    const existing = cart.find(p => p.products_id === product.products_id);

    if (existing) {
      setCart(cart.map(p =>
        p.products_id === product.products_id
          ? { ...p, qty: p.qty + 1 }
          : p
      ));
    } else {
      setCart([
        ...cart,
        {
          products_id: product.products_id,
          products_name: product.products_name,
          price: product.price,
          qty: 1
        }
      ]);
    }
  };

  // ➖ remove
  const removeItem = (id: string) => {
    setCart(cart.filter(c => c.products_id !== id));
  };

  // 💸 checkout
  const handleCheckout = async () => {
    try {
      const res = await checkout(cart);
      alert(`Success! Total: ${res.total}`);
      setCart([]);
    } catch (err: unknown) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("Error");
        }
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  return (
    <Box sx={{ p: 3, display: "flex", gap: 3 }}>

      {/* LEFT: PRODUCTS */}
      <Paper sx={{ p: 2, width: "60%" }}>
        <Typography variant="h6" mb={2}>Products</Typography>

        <Stack spacing={1}>
          {products.map((p) => (
            <Button
              key={p.products_id}
              variant="contained"
              onClick={() => addToCart(p)}
              disabled={p.stock === 0}
            >
              {p.products_name} - Rp{p.price} (Stock: {p.stock})
            </Button>
          ))}
        </Stack>
      </Paper>

      {/* RIGHT: CART */}
      <Paper sx={{ p: 2, width: "40%" }}>
        <Typography variant="h6" mb={2}>Cart</Typography>

        {cart.length === 0 ? (
          <Typography>No items</Typography>
        ) : (
          <Stack spacing={1}>
            {cart.map((item) => (
              <Box
                key={item.products_id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  {item.products_name} x{item.qty}
                </Typography>

                <Button onClick={() => removeItem(item.products_id)}>
                  ❌
                </Button>
              </Box>
            ))}
          </Stack>
        )}

        <Typography mt={2}>Total: Rp{total}</Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default POS;