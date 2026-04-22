import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));
const POS = lazy(() => import("../pages/POS"));
const ProductManagement = lazy(() => import("../pages/ProductManagement"));

export default function AppRoutes() {
  const { isLoading, user } = useAppSelector(state => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/login" />}
        />

        {/* 🔥 PROTECTED LAYOUT */}
        <Route
          path="/"
          element={user ? <MainMenu /> : <Navigate to="/login" />}
        >
          {/* default page */}
          <Route index element={<Navigate to="/pos" />} />

          {/* POS inside MainMenu */}
          <Route path="pos" element={<POS />} />
          <Route path="products" element={<ProductManagement />} />

        </Route>

        {/* fallback */}
        <Route
          path="*"
          element={<Navigate to={user ? "/pos" : "/login"} />}
        />
      </Routes>
    </Suspense>
  );
}