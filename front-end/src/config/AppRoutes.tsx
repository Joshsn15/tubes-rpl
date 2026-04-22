import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lazy } from "react";

import RoleLayout from "../layouts/RoleLayout";
import { earthTheme } from "../themes/themes";

// Manager
import ManagerDashboard from "../pages/ManagerPage/ManagerDashboard";
import EditProducts from "../pages/ManagerPage/EditProducts";
import FinancialReports from "../pages/ManagerPage/FinancialReports";
import ApprovalPage from "../pages/ManagerPage/ApprovalPage";
import AddProduct from "../pages/ManagerPage/AddProductPage";


// Lazy
const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));

//stocker
const FormLaporan = lazy(() => import("../pages/StockerPage/stockForm"));
const ReceivalBarang = lazy(() => import("../pages/StockerPage/receivalBarang"));
const StockPage = lazy(() => import("../pages/StockerPage/stockPage"));

const EmployeeCRUD = lazy(() => import("../pages/AdminPage/employeePage"));
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
                    <Route path="/manager/add-product" element={<AddProduct />} />
                </Route>

                {/* ── ADMIN ── */}
                <Route element={<RoleLayout role="admin" />}>
                    <Route path="/employee" element={<EmployeeCRUD />} />

                </Route>

                {/* ── EMPLOYEE ── */}
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MainMenu />} />
                </Route>


                {/* ── STOCKER ── */}
                <Route element={<RoleLayout role="stocker" />}>
                        <Route path="/form" element={<FormLaporan />} />
                        <Route path="/receival" element={<ReceivalBarang />} />
                        <Route path="/stock" element={<StockPage />} />

                </Route>
            </Routes>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>
        </ThemeProvider>
    );
}
