import { useLocation, useNavigate } from "react-router";
import { Box, Typography, Chip } from "@mui/material";
  import {  NAV_CONFIG, ROLE_META } from "../types/nav.types";
import type { Role } from "../types/nav.types";
import logo from "../assets/logo.png";
interface NavbarProps {
  role: Role;
}

export default function Navbar({ role } : NavbarProps)  {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = NAV_CONFIG[role];
  const meta = ROLE_META[role];

  return (
    <Box
      sx={{
        px: 3,
        py: 3,
        display: "flex",
        alignItems: "center",
        border: "1px solid #322015",
        borderRadius: "10px 10px 10px 10px",
        gap: 3,
        position: "sticky",
        top: 0,
        zIndex: 100,
        bgcolor: "#231a14",
      }}
    >
      {/* Logo */}
      <Box
        onClick={() => navigate(`/${role}`)}
        sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2, cursor: "pointer" }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="logo" width={50} height={45} />
        </Box>
      </Box>

      {/* Nav Links */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Typography
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              fontSize: 12,
              cursor: "pointer",
              color: isActive ? "#f0f0f0" : "#555",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: 0.3,
              transition: "color 0.2s",
              position: "relative",
              "&:hover": { color: "#aaa" },
              // active underline dot
              "&::after": isActive
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: meta.color,
                  }
                : {},
            }}
          >
            {item.label}
          </Typography>
        );
      })}

      <Box sx={{ flex: 1 }} />

      {/* Role Badge */}
      <Chip
        label={meta.label}
        size="small"
        sx={{
          bgcolor: meta.chipColor,
          border: `1px solid ${meta.color}40`,
          color: meta.color,
          fontSize: 11,
          height: 26,
          fontFamily: "inherit",
          fontWeight: 700,
        }}
      />
    </Box>
  );
};