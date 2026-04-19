import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { earthTheme } from "./themes/themes";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
function App() {

    return (
    <Provider store={store}>
    <ThemeProvider theme={earthTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
  );
}

export default App
