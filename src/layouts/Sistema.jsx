
import React from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../routes.js"

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
        );
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
      </div>
    </>
  )
}

export default Sistema
