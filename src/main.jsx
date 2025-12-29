import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import ContextShare from './context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthContext>
        <ContextShare><App /></ContextShare>
      </AuthContext>

    </BrowserRouter>

  </StrictMode>,
)
