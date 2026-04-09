import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { earthTheme } from "./themes/themes";
function App() {

    return (
    <ThemeProvider theme={earthTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
