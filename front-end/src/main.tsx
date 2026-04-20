// import { StrictMode } from 'react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes'
import { ThemeProvider } from '@emotion/react'
import { earthTheme } from './themes/themes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={earthTheme}>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode >,
)

