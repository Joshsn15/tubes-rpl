import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { getProducts, updateProductPrice } from "../services/pos.api";

interface Product {
  products_id: string;
  products_name: string;
  price: number;
  category: string;
}

const ProductManagement = () => {
  const { token, user } = useAppSelector((state) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;

    getProducts().then(setProducts);
  }, [user]);

  const grouped = products.reduce(
    (acc: Record<string, Product[]>, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }

      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  const handlePriceChange = (id: string, value: number) => {
    setEditedPrices((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = async (id: string) => {
    try {
      if (!token) throw new Error("No token");

      const newPrice = editedPrices[id];
      if (newPrice == null) return;

      await updateProductPrice(id, newPrice, token);

      setProducts((prev) =>
        prev.map((p) =>
          p.products_id === id
            ? { ...p, price: newPrice }
            : p
        )
      );

      alert("Price updated successfully");
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update"
      );
    }
  };

  if (!user) {
    return (
      <Box p={3}>
        <Typography variant="h6">
          Login required
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        bgcolor: "#F5F1E8"
      }}
    >
      <Typography
        variant="h5"
        mb={4}
        fontWeight={700}
        color="#2E2A26"
      >
        Product Management
      </Typography>

      {Object.entries(grouped).map(([category, items]) => (
        <Box key={category} mb={5}>
          {/* CATEGORY TITLE */}
          <Typography
            variant="h6"
            mb={2}
            fontWeight={600}
            color="#6B4A3A"
          >
            {category}
          </Typography>

          <Grid container spacing={3}>
            {items.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.products_id}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "12px",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E0D6C8",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.05)"
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight={700}
                      color="#2E2A26"
                    >
                      {product.products_name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="#7A6F66"
                      mt={1}
                    >
                      Current Price: Rp{product.price}
                    </Typography>
                  </Box>

                  <Stack spacing={1.5}>
                    <TextField
                      size="small"
                      type="number"
                      value={
                        editedPrices[
                          product.products_id
                        ] ?? product.price
                      }
                      onChange={(e) =>
                        handlePriceChange(
                          product.products_id,
                          Number(e.target.value)
                        )
                      }
                      sx={{
                        backgroundColor: "#FAF7F2"
                      }}
                    />

                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        bgcolor: "#6B4A3A",
                        color: "white",
                        "&:hover": {
                          bgcolor: "#5A3D2F"
                        }
                      }}
                      onClick={() =>
                        handleSave(product.products_id)
                      }
                    >
                      Save Price
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ProductManagement;