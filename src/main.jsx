import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App'
import './index.css'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
