import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './styles/main.scss'

// Inicializar AOS (Animate On Scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
})

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/take-out-tours">
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f1f1f',
              color: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
            },
            success: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#ffffff'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff'
              }
            }
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
