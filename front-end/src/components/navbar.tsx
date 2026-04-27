import { useLocation, useNavigate } from "react-router";
import { Box, Typography, Chip, Button } from "@mui/material";
import { NAV_CONFIG, ROLE_META } from "../types/nav.types";
import type { Role } from "../types/nav.types";
import logo from "../assets/logo.png";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
interface NavbarProps {
  role: Role;
}

export default function Navbar({ role }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navItems = NAV_CONFIG[role];
  const meta = ROLE_META[role];
   const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect after logout
  };
  return (
    <Box
      sx={{
        px: 3,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        border: "1px solid #D7D4B1",
        borderRadius: "12px",
        gap: 3,
        position: "sticky",
        top: 0,
        zIndex: 100,
        bgcolor: "#D8EBF9",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
      }}
    >
      <Box
        onClick={() => navigate(`/${role}`)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mr: 2,
          cursor: "pointer"
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            overflow: "hidden",
            bgcolor: "#51322910"
          }}
        >
          <img src={logo} alt="logo" style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }} />
        </Box>
      </Box>

      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Typography
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              fontSize: 13,
              cursor: "pointer",
              color: isActive ? "#513229" : "#7a6a58",
              fontWeight: isActive ? 700 : 500,
              letterSpacing: 0.3,
              transition: "all 0.2s",
              position: "relative",

              "&:hover": {
                color: "#513229"
              },

              "&::after": isActive
                ? {
                  content: '""',
                  position: "absolute",
                  bottom: -6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#FCE6B7"
                }
                : {}
            }}
          >
            {item.label}
          </Typography>
        );
      })}

      <Box sx={{ flex: 1 }} />
      <Button
        onClick={handleLogout}
        variant="contained"
        size="small"
        sx={{
          bgcolor: "#fce6b7",
          textTransform: "none",
          fontSize: 12,
          borderRadius: "8px",
          px: 2,
          "&:hover": {
            bgcolor: "#3b241d"
          }
        }}
      >
        Logout
      </Button>
      {/* Role Badge */}
      <Chip
        label={meta.label}
        size="small"
        sx={{
          bgcolor: "#fce6b7",
          border: "1px solid #51322920",
          color: "#513229",
          fontSize: 11,
          height: 30,
          fontWeight: 700,
          borderRadius: "8px"
        }}
      />
    </Box>
  );
};