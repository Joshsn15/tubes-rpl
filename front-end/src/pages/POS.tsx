import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack
} from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { getProducts, checkout } from "../services/pos.api";
import type { Product, CartItem } from "../types/pos";

const POS = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    if (!user) return;

    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [user]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.products_id === product.products_id
      );

      if (existing) {
        return prev.map((p) =>
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

  const removeItem = (id: string) => {
    setCart((prev) =>
      prev.filter((c) => c.products_id !== id)
    );
  };

  const handleCheckout = async () => {
    try {
      if (!selectedPayment) {
        throw new Error("Please select a payment method");
      }

      const res = await checkout(cart, selectedPayment);

      alert(
        `Success!\nPayment: ${selectedPayment}\nTotal: Rp${res.total}`
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const purchasedItem = cart.find(
            (item) =>
              item.products_id === product.products_id
          );

          if (!purchasedItem) return product;

          return {
            ...product,
            stock: product.stock - purchasedItem.qty
          };
        })
      );

      setCart([]);
      setSelectedPayment("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error");
      }
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          You must be logged in to access POS
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        gap: 3,
        minHeight: "100vh",
        bgcolor: "background.default"
      }}
    >
      {/* LEFT */}
      <Paper
        sx={{
          p: 3,
          width: "60%",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider"
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Products
        </Typography>

        <Stack spacing={2}>
          {products.map((p) => (
            <Button
              key={p.products_id}
              variant="contained"
              color="secondary"
              onClick={() => addToCart(p)}
              disabled={p.stock === 0}
              sx={{
                justifyContent: "space-between",
                py: 1.5,
                fontWeight: 600
              }}
            >
              {p.products_name} - Rp{p.price} (Stock: {p.stock})
            </Button>
          ))}
        </Stack>
      </Paper>

      {/* RIGHT */}
      <Paper
        sx={{
          p: 3,
          width: "40%",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider"
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>
            No items selected
          </Typography>
        ) : (
          <Stack spacing={2}>
            {cart.map((item) => (
              <Box
                key={item.products_id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider"
                }}
              >
                <Typography>
                  {item.products_name} x{item.qty}
                </Typography>

                <Button
                  size="small"
                  color="error"
                  onClick={() =>
                    removeItem(item.products_id)
                  }
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        )}

        <Typography sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
          Payment Method
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {["CASH", "DEBIT", "CREDIT", "QRIS"].map((method) => (
            <Button
              key={method}
              variant={
                selectedPayment === method
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedPayment(method)}
              sx={{ minWidth: "90px" }}
            >
              {method}
            </Button>
          ))}
        </Stack>

        <Typography
          variant="h6"
          sx={{ mt: 3, fontWeight: 700 }}
        >
          Total: Rp{total}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
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