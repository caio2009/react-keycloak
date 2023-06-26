import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: '',
  realm: '',
  clientId: ''
})

export default keycloak