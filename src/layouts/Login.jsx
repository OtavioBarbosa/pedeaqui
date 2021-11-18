
import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"
import { getMesa } from "../utils/storage.js"
import { isAuthenticated } from "../services/auth.js"
import { useHistory } from "react-router"

const Login = () => {

  const history = useHistory()

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={`${prop.layout}${prop.path}`}
            component={prop.component}
            key={key}
          />
        )
      } 
      else {
        return null
      }
    })
  }

  useEffect(() => {
    if(getMesa() && isAuthenticated()){
      history.push(`/pedeaqui/cardapio/${getMesa().estabelecimento_id}`)
    }
    else if(isAuthenticated()){
      history.push(`/pedeaqui/opcao`)
    }
  }, [history])

  return (
    <>
      <div className='fundo-login'>
        <Switch>{getRoutes(routes)}</Switch>
      </div>
    </>
  )
}

export default Login
