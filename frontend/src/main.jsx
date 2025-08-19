import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ModelProvider from './app/ModelProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
