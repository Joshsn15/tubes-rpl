import { Box, Typography, Chip } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import logo from "../assets/logo.jpeg";

const MainMenu = () => {
  const navigate = useNavigate();

  // ambil user dari redux (lebih aman)
  const { user } = useAppSelector(state => state.auth);
  const role = user?.role;

  return (
    <>
      {/* 🔝 NAVBAR */}
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
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            cursor: "pointer"
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              borderRadius: "50%"
            }}
          />
        </Box>

        {/* POS BUTTON */}
        <Typography
          onClick={() => navigate("/pos")}
          sx={{
            fontSize: 13,
            cursor: "pointer",
            color: "#7a6a58",
            fontWeight: 600,
            letterSpacing: 0.3,
            transition: "all 0.2s",
            "&:hover": {
              color: "#513229"
            }
          }}
        >
          POS
        </Typography>

        <Typography
          onClick={() => navigate("/products")}
          sx={{
            fontSize: 13,
            cursor: "pointer",
            color: "#7a6a58",
            fontWeight: 600,
            letterSpacing: 0.3,
            transition: "all 0.2s",
            "&:hover": {
              color: "#513229"
            }
          }}
        >
          Product Management
        </Typography>

        



        <Box sx={{ flex: 1 }} />

        {/* ROLE CHIP */}
        <Chip
          label={role ?? "GUEST"}
          size="small"
          sx={{
            bgcolor: "#fce6b7",
            border: "1px solid #51322920",
            color: "#513229",
            fontSize: 11,
            height: 30,
            fontWeight: 700,
            borderRadius: "8px",
            textTransform: "uppercase"
          }}
        />
      </Box>

      {/* 🔥 PAGE CONTENT MASUK SINI */}
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainMenu;