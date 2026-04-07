import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";


// ── Types ──────────────────────────────────────────────────────────────────
type Category = "FOOD" | "DRINK" | "HEALTH" | "BEAUTY";

interface Product {
  products_id: string;
  products_name: string;
  category: Category;
  price: string;
  stock: number;
  manufacture_date: Date;
  expiry_date: Date;
  growth: number;
}


// ── Dummy Data ─────────────────────────────────────────────────────────────
const DUMMY_PRODUCTS: Product[] = [
  { products_id: "uuid-001", products_name: "Mie Goreng Spesial", category: "FOOD", price: "12500.00", stock: 940, manufacture_date: new Date("2024-10-01"), expiry_date: new Date("2025-10-01"), growth: 10 },
  { products_id: "uuid-002", products_name: "Minuman Herbal Collagen", category: "DRINK", price: "25000.00", stock: 861, manufacture_date: new Date("2024-09-15"), expiry_date: new Date("2025-09-15"), growth: 3 },
  { products_id: "uuid-003", products_name: "Joss Vitamin C Effervescent", category: "HEALTH", price: "18900.00", stock: 769, manufacture_date: new Date("2024-08-20"), expiry_date: new Date("2025-08-20"), growth: 2 },
  { products_id: "uuid-004", products_name: "NABIL Night Cream", category: "BEAUTY", price: "45000.00", stock: 710, manufacture_date: new Date("2024-07-10"), expiry_date: new Date("2025-07-10"), growth: 9 },
  { products_id: "uuid-005", products_name: "Ngobrol Premium Coffee", category: "DRINK", price: "32000.00", stock: 652, manufacture_date: new Date("2024-11-05"), expiry_date: new Date("2025-11-05"), growth: 4 },
  { products_id: "uuid-006", products_name: "Susu Kedelai Organik", category: "DRINK", price: "9800.00", stock: 520, manufacture_date: new Date("2024-12-01"), expiry_date: new Date("2025-12-01"), growth: -2 },
  { products_id: "uuid-007", products_name: "Snack Keripik Tempe", category: "FOOD", price: "7500.00", stock: 1200, manufacture_date: new Date("2025-01-10"), expiry_date: new Date("2025-07-10"), growth: 15 },
  { products_id: "uuid-008", products_name: "Serum Wajah Brightening", category: "BEAUTY", price: "85000.00", stock: 340, manufacture_date: new Date("2024-06-01"), expiry_date: new Date("2026-06-01"), growth: 22 },
  { products_id: "uuid-009", products_name: "Madu Hitam Habbatussauda", category: "HEALTH", price: "65000.00", stock: 190, manufacture_date: new Date("2024-05-01"), expiry_date: new Date("2026-05-01"), growth: -5 },
  { products_id: "uuid-010", products_name: "Biskuit Gandum Fiber", category: "FOOD", price: "15000.00", stock: 880, manufacture_date: new Date("2025-01-01"), expiry_date: new Date("2025-12-31"), growth: 7 },
];


export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate()

  const product = DUMMY_PRODUCTS.find((p) => p.products_id === id);

  const [form, setForm] = useState(() => ({
    products_name: product?.products_name || "",
    price: product?.price || "",
  }));
function handleSave(){
    alert("Product Updated")
    return navigate('/manager')
}
  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Product Name"
        value={form.products_name}
        onChange={(e) =>
          setForm({ ...form, products_name: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}