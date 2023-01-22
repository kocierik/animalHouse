import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import App from './App'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router basename='/frontoffice'>
    <App />
  </Router>
)
