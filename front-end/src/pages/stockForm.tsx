import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Divider
} from "@mui/material";

type Product = {
  products_id: string;
  products_name: string;
  stock: number;
};

type Report = {
  report_id: string;
  products_id: string;
  system_stock: number;
  actual_stock: number;
  difference: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  product?: {
    products_name: string;
  };
};

export default function stockForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selected, setSelected] = useState("");
  const [actualStock, setActualStock] = useState<number | "">("");

  useEffect(() => {
    fetch("http://localhost:3000/stock")
      .then(res => res.json())
      .then(data => setProducts(data.data));
  }, []);

  const fetchReports = () => {
    fetch("http://localhost:3000/stock/reports")
      .then(res => res.json())
      .then(data => setReports(data.data));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async () => {
    if (!selected) {
      alert("Pilih produk dulu!");
      return;
    }

    if (actualStock === "") {
      alert("Stock aktual harus diisi!");
      return;
    }

    await fetch("http://localhost:3000/stock/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        products_id: selected,
        actual_stock: Number(actualStock)
      })
    });

    fetchReports();
  };

  const handleApprove = async (id: string) => {
    await fetch("http://localhost:3000/stock/approve-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        report_id: id
      })
    });

    fetchReports();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F1E2",
        minHeight: "100vh",
        p: 4
      }}
    >
      <Typography
        variant="h5"
        mb={3}
        sx={{ color: "#513229", fontWeight: 700 }}
      >
        Laporan Selisih Stock
      </Typography>

      {/* FORM */}
      <Card
        sx={{
          mt: 2,
          mb: 4,
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}
      >
        <CardContent>

          <TextField
            select
            fullWidth
            label="Pilih Produk"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            sx={{ mt:2 , mb: 2 }}
          >
            {products.map((p) => (
              <MenuItem key={p.products_id} value={p.products_id}>
                {p.products_name} (Stock: {p.stock})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Stock Aktual"
            value={actualStock}
            onChange={(e) =>
              setActualStock(e.target.value === "" ? "" : Number(e.target.value))
            }
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!selected || actualStock === ""}
            sx={{
              backgroundColor: "#513229",
              "&:hover": {
                backgroundColor: "#3b231c"
              },
              borderRadius: 2,
              textTransform: "none"
            }}
          >
            Kirim Laporan
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />

      {/* LIST */}
      <Typography
        variant="h6"
        mb={2}
        sx={{ color: "#513229", fontWeight: 600 }}
      >
        Daftar Laporan
      </Typography>

      {reports.map((r) => (
        <Card
          key={r.report_id}
          sx={{
            mb: 2,
            backgroundColor: "#fff",
            borderRadius: 3,
            borderLeft: `6px solid ${r.status === "APPROVED"
                ? "#7CB342"
                : r.status === "REJECTED"
                  ? "#E53935"
                  : "#F9A825"
              }`,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
          }}
        >
          <CardContent>
            <Typography fontWeight="bold" sx={{ color: "#513229" }}>
              {r.product?.products_name}
            </Typography>

            <Typography variant="body2" sx={{ color: "#666" }}>
              System: {r.system_stock} | Actual: {r.actual_stock}
            </Typography>

            <Typography
              fontWeight="bold"
              sx={{
                color: r.difference < 0 ? "#E53935" : "#2E7D32"
              }}
            >
              Selisih: {r.difference}
            </Typography>

            <Box mt={1}>
              <Chip
                label={r.status}
                sx={{
                  backgroundColor:
                    r.status === "APPROVED"
                      ? "#D7D4B1"
                      : r.status === "REJECTED"
                        ? "#FCE6B7"
                        : "#D8EBF9",
                  color: "#513229",
                  fontWeight: 600
                }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}