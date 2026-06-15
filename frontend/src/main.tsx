import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { ProvedorAuth } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProvedorAuth>
        <AppRoutes />
      </ProvedorAuth>
    </BrowserRouter>
  </StrictMode>,
)