import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerNotificationSW } from './utils/notifications.js'

// Enables OS-level (outside-the-app) notifications, like social apps.
registerNotificationSW()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
