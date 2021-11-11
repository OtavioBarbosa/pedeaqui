
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import routes from "../../routes"
import { getRota } from "../../utils/functions"

const Sidebar = (props) => {

  const [item_ativo, setItemAtivo] = useState('Cozinha')

  useEffect(() => {
    const itemAtivo = () => {
      let routes_area_administrativa = routes.filter(r => r.layout === "/area_administrativa")
      let resposta = routes_area_administrativa.find(r => {
        let split = r.path.split(':')
        return getRota().pathname.indexOf(`${r.layout}${split[0]}`) > -1
      })
      setItemAtivo(resposta ? resposta.item_sidebar : null)
    } 

    itemAtivo()
  }, [props])

  return (
    <>
      <div className='sidebar'>
        <div className="pedeaqui">PedeAqui</div>
        <div className="item-sidebar">
          <Link to={`/area_administrativa/cozinha`}>
            {item_ativo === 'Cozinha' && <div className="item-sidebar-ativo"/>}
            {item_ativo !== 'Cozinha' && <div className="item-sidebar-desativado"/>}
            <i className="fas fa-mortar-pestle" />
            <label>Cozinha</label>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar