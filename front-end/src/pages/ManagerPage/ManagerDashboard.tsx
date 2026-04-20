import React, { useState, useMemo, useEffect } from "react";
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
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { Search, Restaurant, LocalDrink, HealthAndSafety, Face } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getStock } from "../../services/pos.api";

// ── Types ─────────────────────────────────────────
type Category = "FOOD" | "DRINK" | "HEALTH" | "BEAUTY";

interface Product {
  products_id: string;
  products_name: string;
  category: Category;
  price: number;
  stock: number;
  manufacture_date: string;
  expiry_date: string;
}

// ── Helpers ───────────────────────────────────────
const CATEGORY_META: Record<Category, { icon: React.ReactNode; color: string; bg: string }> = {
  FOOD: { icon: <Restaurant sx={{ fontSize: 14 }} />, color: "#ff9800", bg: "#ff980015" },
  DRINK: { icon: <LocalDrink sx={{ fontSize: 14 }} />, color: "#29b6f6", bg: "#29b6f615" },
  HEALTH: { icon: <HealthAndSafety sx={{ fontSize: 14 }} />, color: "#00e676", bg: "#00e67615" },
  BEAUTY: { icon: <Face sx={{ fontSize: 14 }} />, color: "#f06292", bg: "#f0629215" },
};

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtDate = (d: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(d));
export default function ManagerDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log("USER:", user);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getStock();
        console.log("RES DATA:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("ERROR:", err);
        // Display error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // blm ada dependency, krn mau fetch sekali aja pas load page

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const byCategory = (["ALL", "FOOD", "DRINK", "HEALTH", "BEAUTY"] as const)[activeTab];

    return products.filter((p) => {
      const matchQ =
        (p.products_name || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q);
      const matchCat = byCategory === "ALL" || p.category === byCategory;

      return matchQ && matchCat;
    });
  }, [search, activeTab, products]);


  function handleNavigate(link: string) {
    navigate(link);
  }

  if (loading) {
    return <Typography sx={{ p: 3 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1280, mx: "auto" }}>

      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Product Management
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          size="small"
          onClick={() => handleNavigate("/manager/add-product")}
        >
          + Add Product
        </Button>
      </Box>

      {/* SEARCH */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
          Stocks
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#1a1a1a",
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
          }}
        >
          <Search sx={{ fontSize: 14, color: "#fff" }} />
          <InputBase
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              fontSize: 12,
              color: "#fff",
              width: 120,
            }}
          />
        </Box>
      </Box>

      {/* TABS */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{ mb: 1.5 }}
      >
        {["All", "Food", "Drink", "Health", "Beauty"].map((label, i) => (
          <Tab key={i} label={label} />
        ))}
      </Tabs>

      {/* TABLE */}
      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((p) => {
                const meta = CATEGORY_META[p.category];

                return (
                  <TableRow key={p.products_id}>
                    <TableCell>{p.products_name}</TableCell>
                    <TableCell>{fmt(p.price)}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                      <Chip
                        icon={<Box sx={{ color: meta.color }}>{meta.icon}</Box>}
                        label={p.category}
                        size="small"
                        sx={{
                          bgcolor: meta.bg,
                          color: meta.color,
                          fontSize: 10,
                        }}
                      />
                    </TableCell>

                    <TableCell>{fmtDate(p.expiry_date)}</TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        onClick={() =>
                          handleNavigate(`/manager/edit/${p.products_id}`)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* FOOTER */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 12 }}>
          Showing {filtered.length} of {products.length}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          Updated: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}
