
import React from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"
import Navigation from "../components/Navigation.jsx"
import Header from "../components/Header.jsx"
import Carrinho from "../components/Carrinho.jsx"
import { getCarrinho } from "../utils/storage.js"

const Sistema = () => {

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
      <div className='fundo-sistema'>
        <Header/>
        <Switch>{getRoutes(routes)}</Switch>
        <Carrinho carrinho={getCarrinho()}/>
        <Navigation/>
      </div>
    </>
  )
}

export default Sistema
