import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './styles/index.css'
import './styles/global.css'
import { ThemeProvider } from './themes/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
