
import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"
import Navigation from "../components/Aplicacao/Navigation.jsx"
import Header from "../components/Aplicacao/Header.jsx"
import Carrinho from "../components/Aplicacao/Carrinho.jsx"
import { getCarrinho, getMesa } from "../utils/storage.js"
import { isAuthenticated } from "../services/auth.js"
import { useHistory } from "react-router"
import { getRota } from "../utils/functions.js"

const Aplicacao = () => {

  const history = useHistory()

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/pedeaqui") {
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
      if(getRota().pathname.indexOf('opcao') > -1){
        history.push(`/pedeaqui/cardapio/${getMesa().estabelecimento_id}`)
      }
    }
    else if(isAuthenticated()){
      history.push(`/pedeaqui/opcao`)
    }
  }, [history])

  return (
    <>
      <div className='fundo-aplicacao'>
        <Header/>
        <Switch>{getRoutes(routes)}</Switch>
        <Carrinho carrinho={getCarrinho()}/>
        <Navigation/>
      </div>
    </>
  )
}

export default Aplicacao
