import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'

import App from './app.tsx'
import { ThemeProvider } from './themes/theme-provider.tsx'
import { queryClient } from './lib/react-query.ts'

import './styles/global.css'
import './styles/inputs.css'
import './styles/scrollbar.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
