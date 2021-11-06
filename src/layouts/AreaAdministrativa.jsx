
import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "../components/AreaAdministrativa/Header.jsx"
import Sidebar from "../components/AreaAdministrativa/Sidebar.jsx"
import routes from "../routes.js"

const AreaAdministrativa = () => {

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/area_administrativa") {
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
      <div className='fundo-area-administrativa'>
        <Header />
        <div className="sidebar-pages">
          <Sidebar />
          <div className="pages-area-administrativa">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
    </>
  )
}

export default AreaAdministrativa
