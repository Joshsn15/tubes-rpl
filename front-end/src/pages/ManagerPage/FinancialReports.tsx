import { useState } from "react";
import {
  Box, Typography, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Button, Chip, TextField,
} from "@mui/material";
import { TrendingUp, TrendingDown, BarChart } from "@mui/icons-material";
import { getLedgerFromToWhere } from "../../services/pos.api";

type LedgerItem = {
  ledger_id: string;
  reference_type: "SALE" | "PURCHASE";
  reference_id: string;
  debit: string;
  credit: string;
  description: string;
  createdAt: string;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(n);

const fmtDate = (d: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(d));

const BG_SURFACE = "#261D17";
const BG_RAISED = "#221A14";
const BG_HOVER = "#2E2018";
const BORDER = "#36261C";
const BORDER_MID = "#4A3428";
const BAY = "#FCE6B7";
const SB = "#D8EBF9";
const LD = "#F4F1E2";
const TEXT_HINT = "#5A4438";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 12, background: BG_RAISED,
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
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState<"LAST_MONTH" | "CUSTOM">("LAST_MONTH");
  const [report, setReport] = useState<{
    income: number; expense: number; profit: number; ledger: LedgerItem[];
  } | null>(null);

  const handleGenerate = async () => {
    try {
      let start = startDate;
      let end = endDate;

      if (mode === "LAST_MONTH") {
        const range = getLastMonthRange();
        start = range.start;
        end = range.end;

        setStartDate(start);
        setEndDate(end);
      }

      if (!start || !end) {
        return alert("Tanggal tidak valid");
      }

      const ledger: LedgerItem[] = await getLedgerFromToWhere(start, end);

      const income = ledger.reduce((acc, i) => acc + Number(i.debit), 0);
      const expense = ledger.reduce((acc, i) => acc + Number(i.credit), 0);
      const profit = income - expense;

      setReport({ income, expense, profit, ledger });

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  const getLastMonthRange = () => {
    const now = new Date();

    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
      start: format(firstDayLastMonth),
      end: format(lastDayLastMonth)
    };
  };
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#000", letterSpacing: ".06em", textTransform: "uppercase", mb: 2 }}>
        Financial Report
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          size="small"
          variant={mode === "LAST_MONTH" ? "contained" : "outlined"}
          onClick={() => setMode("LAST_MONTH")}
        >
          Last Month
        </Button>

        <Button
          size="small"
          variant={mode === "CUSTOM" ? "contained" : "outlined"}
          onClick={() => setMode("CUSTOM")}
        >
          Custom
        </Button>
      </Box>

      {/* Filter */}
      <Card sx={{ mb: 3, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${BAY}`, boxShadow: "none" }}>
        <CardContent sx={{ p: "16px 20px !important" }}>
          {mode === "CUSTOM" && (
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Start Date"
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ ...inputSx, width: 180 }}
              />

              <Typography sx={{ fontSize: 14, color: TEXT_HINT, pb: 0.5 }}>
                →
              </Typography>

              <TextField
                label="End Date"
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ ...inputSx, width: 180 }}
              />
            </Box>
          )}

          {mode === "LAST_MONTH" && (
            <Typography sx={{ fontSize: 12, color: "#fff" }}>
              Generate otomatis untuk 1 bulan terakhir
            </Typography>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={handleGenerate}
            sx={{
              mt: 2,
              background: BAY,
              color: "#2A1810",
              fontWeight: 700,
              fontSize: 11,
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              "&:hover": { background: "#F0D49A" }
            }}
          >
            Generate
          </Button>
        </CardContent>
      </Card>

      {report && (
        <>
          {/* Summary cards */}
          <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
            <Card sx={{ flex: 1, minWidth: 160, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${SB}`, boxShadow: "none" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <TrendingUp sx={{ fontSize: 14, color: SB }} />
                  <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>Income</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: SB }}>{fmt(report.income)}</Typography>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, minWidth: 160, background: BG_SURFACE, border: `1px solid ${BORDER}`, borderTop: "2px solid #B05040", boxShadow: "none" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <TrendingDown sx={{ fontSize: 14, color: "#B05040" }} />
                  <Typography sx={{ fontSize: 9, color: TEXT_HINT, textTransform: "uppercase", letterSpacing: ".1em" }}>Expense</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#B05040" }}>{fmt(report.expense)}</Typography>
              </CardContent>
            </Card>

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

          {/* Table */}
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
                      {["Date", "Type", "Description", "Debit (In)", "Credit (Out)"].map((h) => (
                        <TableCell key={h} sx={{ background: BG_RAISED, color: "#fff", fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", borderColor: BORDER }}>
                          {h}
                        </TableCell>
                      ))}
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report.ledger.map((item) => {
                      const debit = Number(item.debit);
                      const credit = Number(item.credit);
                      return (
                        <TableRow key={item.ledger_id}
                          sx={{ "&:hover td": { background: BG_HOVER },color:"#fff", transition: "background .15s" }}>
                          {/* ✅ pakai createdAt, bukan transactions.transaction_date */}
                          <TableCell sx={{ borderColor: BORDER, color: LD, fontSize: 12 }}>
                            {fmtDate(item.createdAt)}
                          </TableCell>
                          <TableCell sx={{ borderColor: BORDER }}>
                            <Chip label={item.reference_type} size="small"
                              sx={{
                                height: 20, fontSize: 9, fontWeight: 700, borderRadius: "6px",
                                ...(item.reference_type === "SALE"
                                  ? { background: "#1A2830", color: SB, border: `1px solid #253848` }
                                  : { background: "#3A1810", color: "#F0A080", border: `1px solid #4A2818` }),
                              }} />
                          </TableCell>
                          <TableCell sx={{ borderColor: BORDER, color:"#fff", fontSize: 11 }}>
                            {item.description || "—"}
                          </TableCell>
                          {/* ✅ cek number > 0, bukan .length */}
                          <TableCell sx={{ borderColor: BORDER, fontSize: 12, fontWeight: debit > 0 ? 600 : 400, color: debit > 0 ? SB : TEXT_HINT }}>
                            {debit > 0 ? fmt(debit) : "—"}
                          </TableCell>
                          <TableCell sx={{ borderColor: BORDER, fontSize: 12, fontWeight: credit > 0 ? 600 : 400, color: credit > 0 ? "#B05040" : TEXT_HINT }}>
                            {credit > 0 ? fmt(credit) : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Total row */}
                    <TableRow sx={{ background: BG_RAISED }}>
                      <TableCell colSpan={3} sx={{ borderColor: BORDER, color: TEXT_HINT, fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>
                        Total ({report.ledger.length} rows)
                      </TableCell>
                      <TableCell sx={{ borderColor: BORDER, color: SB, fontSize: 12, fontWeight: 700 }}>
                        {fmt(report.income)}
                      </TableCell>
                      <TableCell sx={{ borderColor: BORDER, color: "#B05040", fontSize: 12, fontWeight: 700 }}>
                        {fmt(report.expense)}
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