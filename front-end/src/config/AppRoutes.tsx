import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RoleLayout from "../layouts/RoleLayout";
import ManagerDashboard from "../pages/ManagerPage/ManagerDashboard";
import EditProducts from "../pages/ManagerPage/EditProducts";
import { earthTheme } from "../themes/themes";

// ── Placeholder pages for other roles ─────────────────────────────────────
const Placeholder = ({ title }: { title: string }) => (
    <div style={{ padding: 32, color: "#666", fontFamily: "monospace" }}>
        [{title}] — page coming soon
    </div>
);


// ── App ────────────────────────────────────────────────────────────────────
export default function AppRoutes() {
    return (
        <ThemeProvider theme={earthTheme}>
            <CssBaseline />
            <Routes>

                {/* ── MANAGER ── */}
                <Route element={<RoleLayout role="manager" />}>
                    <Route path="/manager" element={<ManagerDashboard />} />
                    <Route path="/manager/financialReports" element={<Placeholder title="Manager / financial Reports" />} />
                    <Route path="/manager/edit/:id" element={<EditProducts />} />
                </Route>

                {/* ── ADMIN ── */}
                <Route element={<RoleLayout role="admin" />}>
                    {/* disinii pathnya */}
                </Route>

                {/* ── EMPLOYEE ── */}
                <Route element={<RoleLayout role="employee" />}>
                    {/* disinii pathnya */}
                </Route>

                {/* ── STOCKER ── */}
                <Route element={<RoleLayout role="stocker" />}>
                    {/* disinii pathnya */}

                </Route>
            </Routes>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>
        </ThemeProvider>
    );
}