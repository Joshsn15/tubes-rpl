import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { TrendingUp, TrendingDown, BarChart } from "@mui/icons-material";

type LedgerItem = {
  date: string;
  type: "SALE" | "PURCHASE";
  debit: number;
  credit: number;
};

// ── All dummy data ─────────────────────────────────────────────────────────
const ALL_LEDGER: LedgerItem[] = [
  { date: "2026-03-15", type: "SALE",     debit: 0,      credit: 45000 },
  { date: "2026-03-20", type: "PURCHASE", debit: 25000,  credit: 0     },
  { date: "2026-04-01", type: "SALE",     debit: 0,      credit: 50000 },
  { date: "2026-04-02", type: "PURCHASE", debit: 30000,  credit: 0     },
  { date: "2026-04-03", type: "SALE",     debit: 0,      credit: 70000 },
  { date: "2026-04-04", type: "PURCHASE", debit: 20000,  credit: 0     },
  { date: "2026-04-10", type: "SALE",     debit: 0,      credit: 90000 },
  { date: "2026-04-15", type: "PURCHASE", debit: 40000,  credit: 0     },
  { date: "2026-05-01", type: "SALE",     debit: 0,      credit: 60000 },
  { date: "2026-05-03", type: "PURCHASE", debit: 15000,  credit: 0     },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtDate = (d: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(d));

// ── Colors ─────────────────────────────────────────────────────────────────
const BG_SURFACE = "#261D17";
const BG_RAISED  = "#221A14";
const BG_HOVER   = "#2E2018";
const BORDER     = "#36261C";
const BORDER_MID = "#4A3428";
const BAY        = "#FCE6B7";
const SB         = "#D8EBF9";
const LD         = "#F4F1E2";
const TEXT_HINT  = "#5A4438";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 12,
    background: BG_RAISED,
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: BORDER_MID },
    "&.Mui-focused fieldset": { borderColor: BAY },
  },
  "& .MuiInputLabel-root": { fontSize: 11, color: TEXT_HINT },
  "& .MuiInputLabel-root.Mui-focused": { color: BAY },
  "& input": { color: LD, colorScheme: "dark" },
};

export default function FinancialReportPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]     = useState("");
  const [report, setReport] = useState<{
    income: number;
    expense: number;
    profit: number;
    ledger: LedgerItem[];
  } | null>(null);

  const handleGenerate = () => {
    // buat filter day 
    const filtered = ALL_LEDGER.filter((item) => {
      const itemDate = new Date(item.date);
      const from     = startDate ? new Date(startDate) : null;
      const to       = endDate   ? new Date(endDate)   : null;

      if (from && itemDate < from) return false;
      if (to   && itemDate > to)   return false;
      return true;
    });

    const income  = filtered.reduce((acc, i) => acc + i.credit, 0);
    const expense = filtered.reduce((acc, i) => acc + i.debit,  0);
    const profit  = income - expense;

    setReport({ income, expense, profit, ledger: filtered });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      {/* Header */}
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#000", letterSpacing: ".06em", textTransform: "uppercase", mb: 2 }}>
        Financial Report
      </Typography>

      {/* Filter row */}
      <Card sx={{ mb: 3, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${BAY}`, boxShadow: "none" }}>
        <CardContent sx={{ p: "16px 20px !important" }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Start Date"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ ...inputSx, width: 180 }}
            />
            <Typography sx={{ fontSize: 14, color: TEXT_HINT, pb: 0.5 }}>→</Typography>
            <TextField
              label="End Date"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ ...inputSx, width: 180 }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleGenerate}
              sx={{
                background: BAY,
                color: "#2A1810",
                fontWeight: 700,
                fontSize: 11,
                textTransform: "none",
                letterSpacing: ".04em",
                borderRadius: 2,
                px: 2.5,
                "&:hover": { background: "#F0D49A" },
              }}
            >
              Generate
            </Button>
          </Box>
          {/* hint */}
          <Typography sx={{ fontSize: 10, color: TEXT_HINT, mt: 1 }}>
            {!startDate && !endDate
              ? "Kosongkan filter untuk tampilkan semua data"
              : `Menampilkan ${startDate || "awal"} → ${endDate || "akhir"}`}
          </Typography>
        </CardContent>
      </Card>

      {/* Result */}
      {report && (
        <>
          {/* Summary cards */}
          <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
            
            {/* Income */}
            <Card sx={{ flex: 1, minWidth: 160, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid #D8EBF9`, boxShadow: "none" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <TrendingUp sx={{ fontSize: 14, color: SB }} />
                  <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>Income</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: SB }}>{fmt(report.income)}</Typography>
              </CardContent>
            </Card>

            {/* Expense */}
            <Card sx={{ flex: 1, minWidth: 160, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid #B05040`, boxShadow: "none" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <TrendingDown sx={{ fontSize: 14, color: "#B05040" }} />
                  <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>Expense</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#B05040" }}>{fmt(report.expense)}</Typography>
              </CardContent>
            </Card>

            {/* Profit */}
            <Card sx={{ flex: 1, minWidth: 160, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${BAY}`, boxShadow: "none" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <BarChart sx={{ fontSize: 14, color: BAY }} />
                  <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>Profit</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: report.profit >= 0 ? BAY : "#B05040" }}>
                  {fmt(report.profit)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Ledger table */}
          {report.ledger.length === 0 ? (
            <Card sx={{ background: BG_SURFACE, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography sx={{ fontSize: 12, color: TEXT_HINT }}>Tidak ada data pada rentang tanggal ini.</Typography>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ background: BG_SURFACE, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {["Date", "Type", "Debit", "Credit"].map((h) => (
                        <TableCell key={h} sx={{ background: BG_RAISED, color: TEXT_HINT, fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", borderColor: BORDER }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report.ledger.map((item, i) => (
                      <TableRow
                        key={i}
                        sx={{ "&:hover td": { background: BG_HOVER }, transition: "background .15s" }}
                      >
                        <TableCell sx={{ borderColor: BORDER, color: LD, fontSize: 12 }}>
                          {fmtDate(item.date)}
                        </TableCell>
                        <TableCell sx={{ borderColor: BORDER }}>
                          <Chip
                            label={item.type}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: 9,
                              fontWeight: 700,
                              borderRadius: "6px",
                              ...(item.type === "SALE"
                                ? { background: "#1A2830", color: SB, border: `1px solid #253848` }
                                : { background: "#3A1810", color: "#F0A080", border: `1px solid #4A2818` }),
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderColor: BORDER, color: item.debit > 0 ? "#B05040" : TEXT_HINT, fontSize: 12, fontWeight: item.debit > 0 ? 600 : 400 }}>
                          {item.debit > 0 ? fmt(item.debit) : "—"}
                        </TableCell>
                        <TableCell sx={{ borderColor: BORDER, color: item.credit > 0 ? SB : TEXT_HINT, fontSize: 12, fontWeight: item.credit > 0 ? 600 : 400 }}>
                          {item.credit > 0 ? fmt(item.credit) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Total row */}
                    <TableRow sx={{ background: BG_RAISED }}>
                      <TableCell colSpan={2} sx={{ borderColor: BORDER, color: TEXT_HINT, fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>
                        Total ({report.ledger.length} rows)
                      </TableCell>
                      <TableCell sx={{ borderColor: BORDER, color: "#B05040", fontSize: 12, fontWeight: 700 }}>
                        {fmt(report.expense)}
                      </TableCell>
                      <TableCell sx={{ borderColor: BORDER, color: SB, fontSize: 12, fontWeight: 700 }}>
                        {fmt(report.income)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </>
      )}
    </Box>
  );
}