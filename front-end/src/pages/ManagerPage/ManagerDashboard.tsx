import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { Search, Restaurant, LocalDrink, HealthAndSafety, Face } from "@mui/icons-material";
import { useNavigate } from "react-router";

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
}

// ── Dummy Data ─────────────────────────────────────────────────────────────
const DUMMY_PRODUCTS: Product[] = [
  { products_id: "uuid-001", products_name: "Mie Goreng Spesial", category: "FOOD", price: "12500.00", stock: 940, manufacture_date: new Date("2024-10-01"), expiry_date: new Date("2025-10-01") },
  { products_id: "uuid-002", products_name: "Minuman Herbal Collagen", category: "DRINK", price: "25000.00", stock: 861, manufacture_date: new Date("2024-09-15"), expiry_date: new Date("2025-09-15") },
  { products_id: "uuid-003", products_name: "Joss Vitamin C Effervescent", category: "HEALTH", price: "18900.00", stock: 769, manufacture_date: new Date("2024-08-20"), expiry_date: new Date("2025-08-20") },
  { products_id: "uuid-004", products_name: "NABIL Night Cream", category: "BEAUTY", price: "45000.00", stock: 710, manufacture_date: new Date("2024-07-10"), expiry_date: new Date("2025-07-10") },
  { products_id: "uuid-005", products_name: "Ngobrol Premium Coffee", category: "DRINK", price: "32000.00", stock: 652, manufacture_date: new Date("2024-11-05"), expiry_date: new Date("2025-11-05") },
  { products_id: "uuid-006", products_name: "Susu Kedelai Organik", category: "DRINK", price: "9800.00", stock: 520, manufacture_date: new Date("2024-12-01"), expiry_date: new Date("2025-12-01") },
  { products_id: "uuid-007", products_name: "Snack Keripik Tempe", category: "FOOD", price: "7500.00", stock: 1200, manufacture_date: new Date("2025-01-10"), expiry_date: new Date("2025-07-10") },
  { products_id: "uuid-008", products_name: "Serum Wajah Brightening", category: "BEAUTY", price: "85000.00", stock: 340, manufacture_date: new Date("2024-06-01"), expiry_date: new Date("2026-06-01") },
  { products_id: "uuid-009", products_name: "Madu Hitam Habbatussauda", category: "HEALTH", price: "65000.00", stock: 190, manufacture_date: new Date("2024-05-01"), expiry_date: new Date("2026-05-01") },
  { products_id: "uuid-010", products_name: "Biskuit Gandum Fiber", category: "FOOD", price: "15000.00", stock: 880, manufacture_date: new Date("2025-01-01"), expiry_date: new Date("2025-12-31") },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const CATEGORY_META: Record<Category, { icon: React.ReactNode; color: string; bg: string }> = {
  FOOD: { icon: <Restaurant sx={{ fontSize: 14 }} />, color: "#ff9800", bg: "#ff980015" },
  DRINK: { icon: <LocalDrink sx={{ fontSize: 14 }} />, color: "#29b6f6", bg: "#29b6f615" },
  HEALTH: { icon: <HealthAndSafety sx={{ fontSize: 14 }} />, color: "#00e676", bg: "#00e67615" },
  BEAUTY: { icon: <Face sx={{ fontSize: 14 }} />, color: "#f06292", bg: "#f0629215" },
};

const fmt = (n: string | number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(n));

const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(d);

// ── Page ────────────────────────────────────────────────────────────────────
export default function ManagerDashboard() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const byCategory = (["ALL", "FOOD", "DRINK", "HEALTH", "BEAUTY"] as const)[activeTab];
    return DUMMY_PRODUCTS.filter((p) => {
      const matchQ = p.products_name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = byCategory === "ALL" || p.category === byCategory;
      return matchQ && matchCat;
    });
  }, [search, activeTab]);


  function handleNavigate(link : string){
    return navigate(link)
  }
  return (
    <Box sx={{ p: 3, maxWidth: 1280, mx: "auto" }}>
     

    
     

      {/* Stocks Table Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: "#000" }}>
          Stocks
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#1a1a1a", border: "1px solid #252525", borderRadius: 2, px: 1.5, py: 0.5 }}>
          <Search sx={{ fontSize: 14, color: "#ffff" }} />
          <InputBase
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ fontSize: 12, color: "#f0f0f0", width: 120, "& input::placeholder": { color: "#ffff" } }}
          />
        </Box>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          mb: 1.5,
          "& .MuiTab-root": { fontSize: 11, textTransform: "none", letterSpacing: 0.5, color: "#555", py: 0 },
          "& .Mui-selected": { color: "#000 !important" },
          "& .MuiTabs-indicator": { bgcolor: "#00e676", height: 1.5 },
        }}
      >
        {["All", "Food", "Drink", "Health", "Beauty"].map((label, i) => <Tab key={i} label={label} />)}
      </Tabs>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Stocks</TableCell>
                <TableCell>Value (IDR)</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sectors</TableCell>
                <TableCell>Exp Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((p) => {
                const meta = CATEGORY_META[p.category];
                return (
                  <TableRow key={p.products_id} sx={{ cursor: "pointer", transition: "background 0.15s", "&:hover": { bgcolor: "#6B4A3A" } }}>
                    <TableCell><Typography sx={{ fontSize: 12, fontWeight: 600 }}>{p.products_name}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: 12, color: "#aaa" }}>{fmt(p.price)}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: 12, color: "#aaa" }}>{p.stock.toLocaleString("id-ID")}</Typography></TableCell>
                    <TableCell>
                      <Chip
                        icon={<Box sx={{ color: `${meta.color} !important`, display: "flex" }}>{meta.icon}</Box>}
                        label={p.category}
                        size="small"
                        sx={{ bgcolor: meta.bg, color: meta.color, fontSize: 10, height: 20, border: `1px solid ${alpha(meta.color, 0.2)}`, "& .MuiChip-icon": { fontSize: 12 } }}
                      />
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.category === "FOOD" ? "TRADING IND" : p.category}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: 11, color: "#aaa" }}>{fmtDate(p.expiry_date)}</Typography></TableCell>
                    <TableCell>
                      <Button variant="contained" size="small" sx={{ fontSize: 11, textTransform: "none" }} onClick={() => handleNavigate(`/manager/edit/${p.products_id}`)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography sx={{ fontSize: 12, color: "#444" }}>No products found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Footer */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 10, color: "#333" }}>Showing {filtered.length} of {DUMMY_PRODUCTS.length} products</Typography>
        <Typography sx={{ fontSize: 10, color: "#333" }}>Last updated: {new Date().toLocaleTimeString("id-ID")}</Typography>
      </Box>
    </Box>
  );
}