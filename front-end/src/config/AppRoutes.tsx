import { Routes, Route, Navigate } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lazy, Suspense } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import  type {UserRole } from "../utils/roleRedirect";
import RoleLayout from "../layouts/RoleLayout";
import { earthTheme } from "../themes/themes";

// Manager
import ManagerDashboard from "../pages/ManagerPage/ManagerDashboard";
import EditProducts from "../pages/ManagerPage/EditProducts";
import FinancialReports from "../pages/ManagerPage/FinancialReports";
import StockReport from "../pages/ManagerPage/StockReport";
import AddProduct from "../pages/ManagerPage/AddProductPage";
import { getRoleDefaultPath } from '../utils/roleRedirect';

// Lazy
const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));

// Stocker
const FormLaporan = lazy(() => import("../pages/StockerPage/stockForm"));
const ReceivalBarang = lazy(() => import("../pages/StockerPage/receivalBarang"));
const StockPage = lazy(() => import("../pages/StockerPage/stockPage"));

// Admin / Employee
const EmployeeCRUD = lazy(() => import("../pages/AdminPage/employeePage"));
const POS = lazy(() => import("../pages/POS"));
const ProductManagement = lazy(() => import("../pages/ProductManagement"));

export default function AppRoutes() {
  const { isLoading, user } = useAppSelector(state => state.auth);
  const defaultPath = user ? getRoleDefaultPath(user.role as UserRole) : '/register';
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={earthTheme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>

          {/* ── DEFAULT ROOT ── */}
          <Route path="/" element={<Navigate to={defaultPath} replace />} />

          {/* ── AUTH ── */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to={defaultPath} replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={defaultPath} replace />} />

          {/* ── MANAGER ── */}
          <Route element={<RoleLayout role="manager" />}>
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/financialReports" element={<FinancialReports />} />
            <Route path="/manager/edit/:id" element={<EditProducts />} />
            <Route path="/manager/stock-reports" element={<StockReport />} />
            <Route path="/manager/add-product" element={<AddProduct />} />
          </Route>

          {/* ── ADMIN ── */}
          <Route element={<RoleLayout role="admin" />}>
            <Route path="/employee" element={<EmployeeCRUD />} />
          </Route>

          {/* ── STOCKER ── */}
          <Route element={<RoleLayout role="stocker" />}>
            <Route path="/form" element={<FormLaporan />} />
            <Route path="/receival" element={<ReceivalBarang />} />
            <Route path="/stock" element={<StockPage />} />
          </Route>

          {/* ── MAIN APP (PROTECTED) ── */}
          <Route element={user ? <MainMenu /> : <Navigate to="/register" replace />}>
            <Route path="/pos" element={<POS />} />
            <Route path="/products" element={<ProductManagement />} />
          </Route>

          {/* ── FALLBACK ── */}
          <Route path="*" element={<Navigate to={defaultPath} replace />} />

        </Routes>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');`}</style>
      </Suspense>
    </ThemeProvider>
  );
}
