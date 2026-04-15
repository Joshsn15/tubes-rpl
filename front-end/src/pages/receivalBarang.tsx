import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Card,
    CardContent
} from "@mui/material";

type Product = {
    products_id: string;
    products_name: string;
    stock: number;
};

export default function ReceivalBarang() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState("");
    const [qty, setQty] = useState<number | "">("");

    // fetch products
    useEffect(() => {
        fetch("http://localhost:3000/stock")
            .then(res => res.json())
            .then(data => setProducts(data.data));
    }, []);

    const handleSubmit = async () => {
        if (!selected) {
            alert("Pilih produk dulu!");
            return;
        }

        if (qty === "" || qty <= 0) {
            alert("Qty harus lebih dari 0!");
            return;
        }

        await fetch("http://localhost:3000/stock/receival", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: [
                    {
                        products_id: selected,
                        qty: Number(qty)
                    }
                ]
            })
        });

        alert("Stock berhasil ditambahkan!");
        setQty("");
    };

    return (
        <Box
            sx={{
                backgroundColor: "#F4F1E2",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: 10,
                p: 4
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 850 }}>

                {/* TITLE */}
                <Typography
                    variant="h4"
                    sx={{
                        color: "#513229",
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 3 
                    }}
                >
                    Receival Barang
                </Typography>

                {/* CARD */}
                <Card
                    sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        minHeight: 500,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        border: "1px solid #E6E0D4",
                        p: 2,
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            p: 4,
                            pt: 10
                        }}
                    >
                        {/* PILIH PRODUK */}
                        <TextField
                            select
                            fullWidth
                            label="Pilih Produk"
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {products.map((p) => (
                                <MenuItem key={p.products_id} value={p.products_id}>
                                    {p.products_name} (Stock: {p.stock})
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* QTY */}
                        <TextField
                            type="number"
                            label="Jumlah Masuk"
                            value={qty}
                            onChange={(e) =>
                                setQty(e.target.value === "" ? "" : Number(e.target.value))
                            }
                        />

                        {/* BUTTON */}
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                            disabled={!selected || qty === ""}
                            sx={{
                                backgroundColor: "#513229",
                                "&:hover": {
                                    backgroundColor: "#3b231c"
                                },
                                borderRadius: 3,
                                textTransform: "none",
                                py: 1.5
                            }}
                        >
                            Simpan Receival
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}