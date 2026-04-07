import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/navbar";
import type { Role } from "../types/nav.types";

 
interface RoleLayoutProps {
  role: Role;
}
 
export default function RoleLayout({ role }: RoleLayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Navbar role={role} />
        <Outlet />
      </Box>
    </Box>
  );
} 