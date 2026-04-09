import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));
export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainMenu />} />
      </Routes>
  );
}