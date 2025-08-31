import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from "@heroui/react";
// import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
       <HeroUIProvider>
        <App/>
       </HeroUIProvider>
  </StrictMode>,
)
