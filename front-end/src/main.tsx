import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes'
import  { ThemeProvider } from '@emotion/react'
import {earthTheme} from './themes/themes'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={earthTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
