import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route as RRDRoute, RouteProps as RRDRouteProps, Link } from 'react-router-dom'

import { KeycloakContext } from './contexts/KeycloakContext'

// ================================================================================

// interface RouteProps extends RRDRouteProps {
//   isPrivate?: boolean;
// }
// function Route(props: RouteProps) {
//   const { keycloak } = useContext(KeycloakContext)

//   const { isPrivate = false, ...rest } = props

//   if (isPrivate && !keycloak.authenticated) keycloak.login()

//   return <RRDRoute {...rest} />
// }

// ================================================================================

interface PrivatePageProps {
  children: JSX.Element;
}
function PrivatePage(props: PrivatePageProps) {
  const { children } = props

  const { keycloak } = useContext(KeycloakContext)

  useEffect(() => {
    if (!keycloak.authenticated) keycloak.login()
  }, [keycloak])

  if (!keycloak.authenticated) return <h1 style={{ fontSize: '5rem' }}>Unauthorized!</h1>
  return children
}

function HomePage() {
  return <h1>Home</h1>
}

function FooPage() {
  return <h1>Foo</h1>
}

function BarPage() {
  return <h1>Bar</h1>
}

// ================================================================================

function App() {
  const { keycloak } = useContext(KeycloakContext)

  function handleLogoutClick() {
    keycloak
      .logout()
      .then(() => keycloak.login())
  }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/foo">Foo</Link>
          </li>
          <li>
            <Link to="/bar">Bar</Link>
          </li>
          {keycloak.authenticated && (
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      <Switch>
        <RRDRoute
          path="/"
          component={() => <HomePage />}
          exact
        />
        <RRDRoute
          path="/foo"
          component={() => (
            <PrivatePage>
              <FooPage />
            </PrivatePage>
          )}
        />
        <RRDRoute
          path="/bar"
          component={() => (
            <PrivatePage>
              <BarPage />
            </PrivatePage>
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
