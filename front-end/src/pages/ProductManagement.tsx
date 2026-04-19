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
  const grouped = products.reduce((acc: any, product) => {
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

      // update UI
      setProducts(prev =>
        prev.map(p =>
          p.products_id === id ? { ...p, price: newPrice } : p
        )
      );

      alert("Price updated");
    } catch (err) {
      alert("Failed to update");
    }
  };

  if (!user) {
    return <Typography p={3}>Login required</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
        Product Management
      </Typography>

      {Object.entries(grouped).map(([category, items]: any) => (
        <Box key={category} mb={4}>
          {/* CATEGORY TITLE */}
          <Typography variant="h6" mb={2}>
            {category}
          </Typography>

          {/* GRID */}
          <Grid container spacing={2}>
            {items.map((product: Product) => (
              <Grid item xs={6} md={3} key={product.products_id}>
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
                  <Typography fontWeight={600}>
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