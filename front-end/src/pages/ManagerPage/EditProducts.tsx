import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getProduct, updateProduct } from "../../services/pos.api";

// ── Types ──────────────────────────────────────────────────────────────────
type Category = "FOOD" | "DRINK" | "HEALTH" | "BEAUTY";

interface Product {
  products_id: string;
  products_name: string;
  category: Category;
  price: number;
  stock: number;
  manufacture_date: Date;
  expiry_date: Date;
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    products_name: "",
    price: 0,
  });

  useEffect(() => {
    console.log("USER:", user);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProduct(id as string);
        setProducts(res);
        // ✅ isi form setelah data ada
        setForm({
          products_name: res.products_name || "",
          price: res.price || "",
        });
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);
  
  function handleSave() {
    if (!form.products_name || !form.price) {
      alert("Please fill in all fields");
      return;
    }

    alert("Product Updated");
    try {
      updateProduct(id as string, form);
      navigate("/manager");
    }
    catch (err) {
      console.error("ERROR:", err);
      alert("Failed to update product");
    }
  }

  if (loading) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  if (!products) {
    return <Box sx={{ p: 3 }}>Product not found</Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Product Name"
        value={form.products_name}
        onChange={(e) => setForm({ ...form, products_name: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}