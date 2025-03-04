import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/* Conecta el Budget con la App */}
    <BudgetProvider>  
      <App />
    </BudgetProvider>
  </StrictMode>,
)
