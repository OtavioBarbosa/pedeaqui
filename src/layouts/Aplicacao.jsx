
import React from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"
import Navigation from "../components/Aplicacao/Navigation.jsx"
import Header from "../components/Aplicacao/Header.jsx"
import Carrinho from "../components/Aplicacao/Carrinho.jsx"
import { getCarrinho } from "../utils/storage.js"

const Aplicacao = () => {

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
