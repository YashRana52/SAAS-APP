import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  
   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'  appearance={{
    baseTheme: dark,
    variables: {
      colorPrimary: '#22c55e', 
    },
  }}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </ClerkProvider>

  
)
