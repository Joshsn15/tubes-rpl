import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  MenuItem
} from "@mui/material";

type Product = {
  products_id: string;
  products_name: string;
  stock: number;
  price: number;
  category: string;
};

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    fetch("http://localhost:3000/stock")
      .then(res => res.json())
      .then(data => setProducts(data.data));
  }, []);

  // 🔍 FILTER
  const filtered = products.filter((p) => {
    const matchSearch = p.products_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "ALL" || p.category === category;

    return matchSearch && matchCategory;
  });

  // 📊 SUMMARY
  const total = products.length;
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <Box
      sx={{
        backgroundColor: "#F4F1E2",
        minHeight: "100vh",
        p: 4
      }}
    >
      {/* TITLE */}
      <Typography
        variant="h4"
        sx={{
          color: "#513229",
          fontWeight: 700,
          mb: 2,
          textAlign: "center"
        }}
      >
        Stock Dashboard
      </Typography>

      {/* SUMMARY */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4
        }}
      >
        <Grid container spacing={2} maxWidth={500}>

          <Grid item xs={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Total Produk</Typography>
                <Typography fontWeight="bold" fontSize={20}>
                  {total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Low Stock</Typography>
                <Typography fontWeight="bold" fontSize={20} color="error">
                  {lowStock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>

      {/* FILTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2
        }}
      >
        <Grid container spacing={2} maxWidth={600}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Produk"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Filter Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="ALL">Semua</MenuItem>
              <MenuItem value="FOOD">Food</MenuItem>
              <MenuItem value="DRINK">Drink</MenuItem>
              <MenuItem value="HEALTH">Health</MenuItem>
              <MenuItem value="BEAUTY">Beauty</MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </Box>

      {/* LIST */}
      <Grid container spacing={3} justifyContent="center">
        {filtered.map((p) => {
          const isLow = p.stock < 10;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.products_id}>
              <Box display="flex" justifyContent="center">
                <Card
                  sx={{
                    height: 180,
                    width: 265,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    border: "1px solid #E6E0D4",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    mt: 3,
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
                    }
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      height: "100%",
                      p: 2.5
                    }}
                  >
                    {/* NAME */}
                    <Typography
                      fontWeight="bold"
                      fontSize={16}
                      sx={{
                        color: "#513229",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // 🔥 max 2 baris
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {p.products_name}
                    </Typography>

                    {/* CATEGORY */}
                    <Chip
                      label={p.category}
                      size="small"
                      sx={{
                        width: "fit-content",
                        backgroundColor: "#EFE9D8",
                        color: "#513229"
                      }}
                    />

                    {/* PUSH KE BAWAH */}
                    <Box mt="auto">
                      {/* STOCK */}
                      <Typography>
                        Stock:{" "}
                        <b
                          style={{
                            color: isLow ? "#d32f2f" : "#2e7d32"
                          }}
                        >
                          {p.stock}
                        </b>
                      </Typography>

                      {/* WARNING */}
                      {isLow && (
                        <Typography
                          color="error"
                          fontSize={12}
                        >
                          ⚠ Hampir Habis
                        </Typography>
                      )}

                      {/* PRICE */}
                      <Typography mt={0.5}>
                        Rp {Number(p.price).toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}