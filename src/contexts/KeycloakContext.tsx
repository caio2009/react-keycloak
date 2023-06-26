import { createContext } from 'react'

import Keycloak from 'keycloak-js'

interface KeycloakContextData {
  keycloak: Keycloak;
}

export const KeycloakContext = createContext({} as KeycloakContextData)

interface KeycloakProviderProps {
  children: JSX.Element;
  keycloak: Keycloak;
}
export default function KeycloakProvider(props: KeycloakProviderProps) {
  const { children, keycloak } = props

  return (
    <KeycloakContext.Provider value={{ keycloak }}>
      {children}
    </KeycloakContext.Provider>
  )
}