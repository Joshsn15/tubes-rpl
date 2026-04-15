import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RoleLayout from "../layouts/RoleLayout";
import ManagerDashboard from "../pages/ManagerPage/ManagerDashboard";
import EditProducts from "../pages/ManagerPage/EditProducts";
import { earthTheme } from "../themes/themes";
import FinancialReports from "../pages/ManagerPage/FinancialReports";
import ApprovalPage from "../pages/ManagerPage/ApprovalPage";
import { lazy } from "react";

const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));



// ── App ────────────────────────────────────────────────────────────────────
export default function AppRoutes() {
    return (
        <ThemeProvider theme={earthTheme}>
            <CssBaseline />
            <Routes>

                {/* ── MANAGER ── */}
                <Route element={<RoleLayout role="manager" />}>
                    <Route path="/manager" element={<ManagerDashboard />} />
                    <Route path="/manager/financialReports" element={<FinancialReports />} />
                    <Route path="/manager/edit/:id" element={<EditProducts />} />
                    <Route path="/manager/approval" element={<ApprovalPage />} />
                </Route>

                {/* ── ADMIN ── */}
                <Route element={<RoleLayout role="admin" />}>
                    {/* disinii pathnya */}
                </Route>

                {/* ── EMPLOYEE ── */}
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MainMenu />} />
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
