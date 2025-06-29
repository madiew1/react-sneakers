import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import 'macro-css'
import App from './App'

const rootElem = document.getElementById('root')

if (rootElem) {
  createRoot(rootElem).render(
    <Router>
      <App/>
    </Router>
  )
}
 