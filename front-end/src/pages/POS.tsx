import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { getProducts, checkout } from "../services/pos.api";
import type { Product, CartItem } from "../types/pos";

const POS = () => {
  const { user, token } = useAppSelector(state => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 auth guard (prevents weird blank / redirect loops)
  useEffect(() => {
    if (!user) return;
    
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [user]);

  // ➕ add to cart
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.products_id === product.products_id);

      if (existing) {
        return prev.map(p =>
          p.products_id === product.products_id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          products_id: product.products_id,
          products_name: product.products_name,
          price: product.price,
          qty: 1
        }
      ];
    });
  };

  // ➖ remove
  const removeItem = (id: string) => {
    setCart(prev => prev.filter(c => c.products_id !== id));
  };

  // 💸 checkout (NOW AUTH SAFE)
  const handleCheckout = async () => {
    try {
      if (!token) throw new Error("No auth token");

      const res = await checkout(cart, token);

      alert(`Success! Total: ${res.total}`);
      setCart([]);
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Error");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  // 🔥 BLOCK UI if not logged in
  if (!user) {
    return (
      <Box p={3}>
        <Typography variant="h6">
          You must be logged in to access POS
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box p={3}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", gap: 3 }}>

      {/* LEFT: PRODUCTS */}
      <Paper sx={{ p: 2, width: "60%" }}>
        <Typography variant="h6" mb={2}>
          Products
        </Typography>

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
        <Typography variant="h6" mb={2}>
          Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography>No items</Typography>
        ) : (
          <Stack spacing={1}>
            {cart.map((item) => (
              <Box
                key={item.products_id}
                sx={{ display: "flex", justifyContent: "space-between" }}
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