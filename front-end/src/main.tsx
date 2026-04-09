import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={earthTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
