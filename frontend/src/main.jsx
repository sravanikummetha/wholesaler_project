import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './authconfig.jsx';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')).render(
  <MsalProvider instance={msalInstance}>
    <StrictMode>
      <App />
    </StrictMode>
  </MsalProvider>
);
