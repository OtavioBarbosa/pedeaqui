
import React from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"
import Navigation from "../components/Navigation.jsx"

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
        <Switch>{getRoutes(routes)}</Switch>
        <Navigation/>
      </div>
    </>
  )
}

export default Sistema
