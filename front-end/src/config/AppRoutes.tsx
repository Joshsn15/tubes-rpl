import { Routes, Route, Navigate } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lazy, Suspense } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import RoleLayout from "../layouts/RoleLayout";
import { earthTheme } from "../themes/themes";

// Manager
import ManagerDashboard from "../pages/ManagerPage/ManagerDashboard";
import EditProducts from "../pages/ManagerPage/EditProducts";
import FinancialReports from "../pages/ManagerPage/FinancialReports";
import StockReport from "../pages/ManagerPage/StockReport";
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
const POS = lazy(() => import("../pages/POS"));
const ProductManagement = lazy(() => import("../pages/ProductManagement"));
// ── App ────────────────────────────────────────────────────────────────────
export default function AppRoutes() {
  const { isLoading, user } = useAppSelector(state => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={earthTheme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading page...</div>}>


        <Routes>

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

          {/* ── EMPLOYEE ── */}
          <Route>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/pos" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/pos" />} />
              {/* 🔥 PROTECTED LAYOUT */}
              <Route path="/" element={user ? <MainMenu /> : <Navigate to="/login" />} />
              <Route>
                {/* default page */}
                <Route index element={<Navigate to="pos" />} />
                {/* POS inside MainMenu */}
                <Route path="pos" element={<POS />} />
                <Route path="products" element={<ProductManagement />} />
              </Route>
              <Route path="*" element={<Navigate to={user ? "/pos" : "/login"} />} />
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
      </Suspense>

    </ThemeProvider>
  );
}
