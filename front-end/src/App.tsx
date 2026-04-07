import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import RoleLayout from "./layouts/RoleLayout";
import ManagerDashboard from "./pages/ManagerPage/ManagerDashboard";

// ── Placeholder pages for other roles ─────────────────────────────────────
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: 32, color: "#666", fontFamily: "monospace" }}>
    [{title}] — page coming soon
  </div>
);

// ── Global Dark Theme ──────────────────────────────────────────────────────
const earthTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F4F1E2",   // Lucky Dice — warm cream page bg
      paper: "#FDFAF2",   // slightly lighter for cards/surfaces
    },
    primary: { main: "#513229", contrastText: "#F4F1E2" }, // Mother Earth
    secondary: { main: "#D8EBF9", contrastText: "#513229" }, // Something Blue
    error: { main: "#A0392B" },                           // deep brick
    warning: { main: "#FCE6B7", contrastText: "#513229" }, // The Bay
    info: { main: "#D8EBF9", contrastText: "#513229" },
    success: { main: "#D7D4B1", contrastText: "#513229" }, // Walking Vinnie
    text: {
      primary: "#2E1A12",  // near-black warm brown
      secondary: "#7A6358",  // muted earth tone
      disabled: "#B8AC9E",
    },
    divider: "#E2DDD0",
  },
  typography: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    body1: { fontFamily: "'DM Mono', monospace", fontSize: 13 },
    body2: { fontFamily: "'DM Mono', monospace", fontSize: 12 },
    caption: { fontFamily: "'DM Mono', monospace", fontSize: 11 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FDFAF2",
          border: "1px solid #E2DDD0",
          boxShadow: "0 1px 4px 0 rgba(81,50,41,0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#E2DDD0",
          padding: "10px 16px",
          color: "#2E1A12",
        },
        head: {
          color: "#B8AC9E",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1,
          background: "#F4F1E2",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
         root: {
          backgroundColor: "#513229",
          color: "#F4F1E2",
          "&:hover": { backgroundColor: "#3D2219" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          backgroundColor: "#FCE6B7",
          color: "#513229",
          border: "1px solid #E8D5A0",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderColor: "#D7D4B1" },
          "&:hover fieldset": { borderColor: "#B8AC9E" },
          "&.Mui-focused fieldset": { borderColor: "#513229" },
        },
        input: { color: "#2E1A12", fontSize: 12 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: "#513229", height: 2 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#B8AC9E",
          "&.Mui-selected": { color: "#513229" },
        },
      },
    },
  },
});
// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider theme={earthTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/manager" replace />} />

          {/* ── MANAGER ── */}
          <Route element={<RoleLayout role="manager" />}>
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/products" element={<Placeholder title="Manager / Products" />} />
            <Route path="/manager/reports" element={<Placeholder title="Manager / Reports" />} />
            <Route path="/manager/market" element={<Placeholder title="Manager / Market Zone" />} />
          </Route>

          {/* ── ADMIN ── */}
          <Route element={<RoleLayout role="admin" />}>
            <Route path="/admin" element={<Placeholder title="Admin / Dashboard" />} />
            <Route path="/admin/users" element={<Placeholder title="Admin / Users" />} />
            <Route path="/admin/settings" element={<Placeholder title="Admin / Settings" />} />
            <Route path="/admin/audit" element={<Placeholder title="Admin / Audit Log" />} />
          </Route>

          {/* ── CASHIER ── */}
          <Route element={<RoleLayout role="employee" />}>
            <Route path="/employee" element={<Placeholder title="employee / Dashboard" />} />
            <Route path="/employee/transaction" element={<Placeholder title="employee / Transaction" />} />
            <Route path="/employee/history" element={<Placeholder title="employee / History" />} />
          </Route>

          {/* ── WAREHOUSE ── */}
          <Route element={<RoleLayout role="stocker" />}>
            <Route path="/stocker" element={<Placeholder title="stocker / Dashboard" />} />
            <Route path="/stocker/stock-in" element={<Placeholder title="stocker / Stock In" />} />
            <Route path="/stocker/purchase-order" element={<Placeholder title="stocker / Purchase Order" />} />
            <Route path="/stocker/stock-log" element={<Placeholder title="stocker / Stock Log" />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>
    </ThemeProvider>
  );
}