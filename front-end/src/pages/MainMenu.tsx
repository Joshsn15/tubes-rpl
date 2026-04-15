import { Box, Typography, Chip } from "@mui/material";
// import { useLocation, useNavigate } from "react-router";

const MainMenu = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    // const navItems = NAV_CONFIG[role];
    // const meta = ROLE_META[role];

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
        // onClick={() => navigate(`/${role}`)}
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
          {/* logo removed safely */}
        </Box>
      </Box>

      {/* TEMP STATIC NAV (so no crash) */}
      {["Home", "Shop", "Profile"].map((label, i) => {
        const isActive = false; // force safe value

        return (
          <Typography
            key={i}
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
              }
            }}
          >
            {label}
          </Typography>
        );
      })}

      <Box sx={{ flex: 1 }} />

      {/* STATIC CHIP */}
      <Chip
        label="Role"
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
}

export default MainMenu;