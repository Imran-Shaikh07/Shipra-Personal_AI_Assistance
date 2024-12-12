import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContex from './context/UserContex.jsx'

createRoot(document.getElementById('root')).render(
  <UserContex>
    <App />
  </UserContex>,
)
