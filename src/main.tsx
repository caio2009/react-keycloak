import React from 'react'
import ReactDOM from 'react-dom/client'

import KeycloakProvider from './contexts/KeycloakContext.tsx'

import App from './App.tsx'

import './index.css'

import keycloak from './keycloak.ts'

keycloak
  .init({
    checkLoginIframe: false
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <KeycloakProvider keycloak={keycloak}>
          <App />
        </KeycloakProvider>
      </React.StrictMode>
    )
  })
  .catch(error => {
    console.log('main.ts [ERROR]', error)
  })
