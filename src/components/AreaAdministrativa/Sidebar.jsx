
import React from "react"
import { Link } from "react-router-dom"

const Sidebar = (props) => {

  return (
    <>
      <div className='sidebar'>
        <div className="pedeaqui">PedeAqui</div>
        <div className="item-sidebar">
          <Link to={`/area_administrativa/cozinha`}>
            <div className="item-sidebar-ativo"/> 
            <i className="fas fa-mortar-pestle" />
            <label>Cozinha</label>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
