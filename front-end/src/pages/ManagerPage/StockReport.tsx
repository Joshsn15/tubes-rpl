import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid
} from "@mui/material";

type StockReport = {
  report_id: string;
  products_id: string;
  system_stock: number;
  actual_stock: number;
  difference: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  product: { products_name: string };
};

/* ===== THEME ===== */
const BG_SURFACE = "#261D17";
const BG_RAISED  = "#221A14";
const BG_HOVER   = "#2E2018";
const BORDER     = "#36261C";
const BORDER_MID = "#4A3428";
const BAY        = "#FCE6B7";
const SB         = "#D8EBF9";
const LD         = "#F4F1E2";
const TEXT_HINT  = "#5A4438";

export default function StockReportsPage() {
  const [reports, setReports] = useState<StockReport[]>([]);
  const [selected, setSelected] = useState<StockReport | null>(null);
  const [correctedActual, setCorrectedActual] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/stock/reports")
      .then((r) => r.json())
      .then((d) => setReports(d.data));
  }, []);

  const finalDiff =
    correctedActual !== "" && selected
      ? Number(correctedActual) - selected.system_stock
      : selected?.difference ?? 0;

  const handleOpen = (rep: StockReport) => {
    setSelected(rep);
    setCorrectedActual("");
  };

  const handleClose = () => {
    setSelected(null);
    setCorrectedActual("");
  };

  const handleSubmit = async (status: "APPROVED" | "REJECTED") => {
    if (!selected) return;

    if (correctedActual !== "") {
      await fetch(`http://localhost:3000/api/stock/reports/${selected.report_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actual_stock: Number(correctedActual) }),
      });
    }

    await fetch("http://localhost:3000/api/stock/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report_id: selected.report_id }),
    });

    setReports((prev) =>
      prev.map((r) => {
        if (r.report_id !== selected.report_id) return r;
        return {
          ...r,
          status,
          actual_stock: correctedActual !== "" ? Number(correctedActual) : r.actual_stock,
          difference: finalDiff,
        };
      })
    );

    handleClose();
  };

  const pending  = reports.filter((r) => r.status === "PENDING").length;
  const approved = reports.filter((r) => r.status === "APPROVED").length;
  const rejected = reports.filter((r) => r.status === "REJECTED").length;

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>

      {/* HEADER */}
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#000", letterSpacing: ".06em", textTransform: "uppercase", mb: 0.5 }}>
        Stock Reports
      </Typography>
      <Typography sx={{ fontSize: 11, color: TEXT_HINT, mb: 3 }}>
        Review dan approve laporan selisih stok dari stocker
      </Typography>

      {/* SUMMARY */}
      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {[
          { label: "Pending",  val: pending,  color: "#E8D58A" },
          { label: "Approved", val: approved, color: "#7ED9A3" },
          { label: "Rejected", val: rejected, color: "#F0A080" },
        ].map(({ label, val, color }) => (
          <Grid sx={{xs: 4}} key={label}>
            <Card sx={{
              background: BG_SURFACE,
              border: `1px solid ${BORDER}`,
              borderTop: `2px solid ${color}`,
              boxShadow: "none"
            }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color }}>
                  {val}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABLE */}
      <Card sx={{ background: BG_SURFACE, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Produk", "Stok sistem", "Stok aktual", "Selisih", "Status", ""].map((h) => (
                  <TableCell key={h} sx={{
                    background: BG_RAISED,
                    color: TEXT_HINT,
                    fontSize: 10,
                    textTransform: "uppercase",
                    borderColor: BORDER
                  }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {reports.map((rep) => (
                <TableRow key={rep.report_id} sx={{
                  "&:hover td": { background: BG_HOVER }
                }}>
                  <TableCell sx={{ color: LD, borderColor: BORDER }}>{rep.product?.products_name}</TableCell>
                  <TableCell align="center" sx={{ color: LD, borderColor: BORDER }}>{rep.system_stock}</TableCell>
                  <TableCell align="center" sx={{ color: LD, borderColor: BORDER }}>{rep.actual_stock}</TableCell>

                  {/* DIFF */}
                  <TableCell align="center" sx={{ borderColor: BORDER }}>
                    <Chip
                      label={rep.difference > 0 ? `+${rep.difference}` : rep.difference}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontWeight: 700,
                        ...(rep.difference > 0
                          ? { background: "#1A2830", color: SB }
                          : rep.difference < 0
                          ? { background: "#3A1810", color: "#F0A080" }
                          : { background: BG_RAISED, color: TEXT_HINT })
                      }}
                    />
                  </TableCell>

                  {/* STATUS */}
                  <TableCell align="center" sx={{ borderColor: BORDER }}>
                    <Chip
                      label={rep.status}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontWeight: 700,
                        ...(rep.status === "APPROVED"
                          ? { background: "#1E2E22", color: "#7ED9A3" }
                          : rep.status === "REJECTED"
                          ? { background: "#3A1810", color: "#F0A080" }
                          : { background: "#2E2A1A", color: "#E8D58A" })
                      }}
                    />
                  </TableCell>

                  <TableCell align="right" sx={{ borderColor: BORDER }}>
                    {rep.status === "PENDING" && (
                      <Button
                        size="small"
                        onClick={() => handleOpen(rep)}
                        sx={{
                          fontSize: 11,
                          textTransform: "none",
                          color: BAY
                        }}
                      >
                        Review
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* MODAL */}
      <Dialog
        open={!!selected}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
       
      >
        <DialogTitle sx={{ color: LD, fontSize: 13, fontWeight: 700 }}>
          Review laporan stok
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: 11, color: TEXT_HINT, mb: 2 }}>
            {selected?.product?.products_name}
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="number"
            value={correctedActual}
            onChange={(e) => setCorrectedActual(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                background: BG_RAISED,
                "& fieldset": { borderColor: BORDER },
                "&:hover fieldset": { borderColor: BORDER_MID },
                "&.Mui-focused fieldset": { borderColor: BAY }
              },
              "& input": { color: LD }
            }}
          />

          <Box sx={{
            background: BG_RAISED,
            border: `1px solid ${BORDER}`,
            borderRadius: 1,
            p: 1.5,
            display: "flex",
            justifyContent: "space-between"
          }}>
            <Typography sx={{ fontSize: 11, color: TEXT_HINT }}>
              Selisih final
            </Typography>
            <Typography sx={{ fontWeight: 700, color: BAY }}>
              {finalDiff > 0 ? `+${finalDiff}` : finalDiff}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: TEXT_HINT }}>Batal</Button>
          <Button onClick={() => handleSubmit("REJECTED")} sx={{ color: "#F0A080" }}>
            Tolak
          </Button>
          <Button onClick={() => handleSubmit("APPROVED")} sx={{ background: BAY, color: "#2A1810" }}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}