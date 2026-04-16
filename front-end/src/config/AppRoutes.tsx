import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Register = lazy(() => import("../pages/Register"));
const MainMenu = lazy(() => import("../pages/MainMenu"));
const Login = lazy(() => import("../pages/Login"));
const POS = lazy(() => import("../pages/POS"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* main menu */}
      <Route path="/" element={<MainMenu />} />

      {/* 🔥 POS route */}
      <Route path="/pos" element={<POS />} />
    </Routes>
  );
}