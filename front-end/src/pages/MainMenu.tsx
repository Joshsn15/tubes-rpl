import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainMenu = () => {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>

      {/* 🔥 NAVBAR */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LEFT: TITLE */}
          <Typography variant="h6">
            Lokanata POS
          </Typography>

          {/* RIGHT: NAV BUTTONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={() => nav("/products")}>
              Product Management
            </Button>

            <Button onClick={() => nav("/cashier")}>
              Cashier
            </Button>

            <Button color="error" onClick={() => nav("/")}>
              Logout
            </Button>
          </Box>

        </Toolbar>
      </AppBar>

      {/* 🔥 PAGE CONTENT */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>

    </Box>
    );
}
export default MainMenu;