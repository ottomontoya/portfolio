import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../portfolio'
import { PointerCursor } from '../components/PointerCursor'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PointerCursor />
  </StrictMode>,
)
