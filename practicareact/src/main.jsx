import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import PersonaList from './pages/PersonaList.jsx'
import FormUsuario from './pages/FormUsuario.jsx'
import './index.css'
import FormLogin from './pages/FormLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/personas" element={<PersonaList />} />
        <Route path="/personas/create" element={<FormUsuario />} />
        <Route path="/personas/:id" element={<FormUsuario />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
