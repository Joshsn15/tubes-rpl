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
  const { token, user } = useAppSelector(state => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    getProducts().then(setProducts);
  }, [user]);

  // group by category
  const grouped = products.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handlePriceChange = (id: string, value: number) => {
    setEditedPrices(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string) => {
    try {
      if (!token) throw new Error("No token");

      const newPrice = editedPrices[id];
      if (newPrice == null) return;

      await updateProductPrice(id, newPrice, token);

      setProducts(prev =>
        prev.map(p =>
          p.products_id === id ? { ...p, price: newPrice } : p
        )
      );

      alert("Price updated");
    } catch {
      alert("Failed to update");
    }
  };

  if (!user) {
    return (
      <Typography sx={{ p: 3 }}>
        Login required
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ mb: 3 }} variant="h5">
        Product Management
      </Typography>

      {Object.entries(grouped).map(([category, items]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography sx={{ mb: 2 }} variant="h6">
            {category}
          </Typography>

          <Grid container spacing={2}>
            {(items as Product[]).map((product) => (
              <Grid  sx={{ xs: 6, md: 3 }} key={product.products_id}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "12px"
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.products_name}
                  </Typography>

                  <Stack spacing={1}>
                    <TextField
                      size="small"
                      type="number"
                      defaultValue={product.price}
                      onChange={(e) =>
                        handlePriceChange(
                          product.products_id,
                          Number(e.target.value)
                        )
                      }
                    />

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleSave(product.products_id)}
                    >
                      Save
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