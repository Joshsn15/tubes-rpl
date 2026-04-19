import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));
const POS = lazy(() => import("../pages/POS"));

export default function AppRoutes() {
  const { isLoading, user } = useAppSelector(state => state.auth);
  const auth = useAppSelector(state => state.auth);
console.log("AUTH STATE:", auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        {/* public route */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* protected routes */}
        <Route
          path="/"
          element={user ? <MainMenu /> : <Navigate to="/login" />}
        />

        <Route
          path="/pos"
          element={user ? <POS /> : <Navigate to="/login" />}
        />

        {/* fallback */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} />}
        />
      </Routes>
    </Suspense>
  );
}