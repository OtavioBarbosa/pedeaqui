
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMesa, getPedido } from "../utils/storage"
import { getRota } from "../utils/functions"
import routes from "../routes"

const Navigation = (props) => {

  const [visualizar, setVisualizar] = useState(true)

  const visualizarNavigation = () => {
    let routes_navigation = routes.filter(r => r.navigation)
    let resposta = routes_navigation.filter(r => {
      let split = r.path.split(':')
      return getRota().pathname.indexOf(`${r.layout}${split[0]}`) > -1
    }).length
    setVisualizar(resposta > 0 ? true : false)
  } 

  const visualizarItem = () => {
    return getPedido() ? true : false
  }

  useEffect(() => {
    visualizarNavigation()
  }, [props])

  return (
    <>
      {visualizar && <div className='navigation'>
        <div className='navigation-item' style={{width: visualizarItem() ? '25%' : '50%'}}>
          <Link to={getMesa() ? `/pedeaqui/cardapio/${getMesa().estabelecimento_id}` : `/pedeaqui/estabelecimentos`}>
            <i className='fas fa-home' />
          </Link>
        </div>
        {visualizarItem() && <div className='navigation-item' style={{width: visualizarItem() ? '25%' : '50%'}}>
          <Link to={`/pedeaqui/pedido/${getPedido()}`}>
            <i className='fas fa-clipboard-list' />
          </Link>
        </div>}
        {visualizarItem() && <div className='navigation-item' style={{width: visualizarItem() ? '25%' : '50%'}}>
          <Link to={`/pedeaqui/pagamento/${getPedido()}`}>
            <i className='fas fa-dollar-sign' />
          </Link>
        </div>}
        <div className='navigation-item' style={{width: visualizarItem() ? '25%' : '50%'}}>
          <Link to={`/pedeaqui/perfil`}>
            <i className='fas fa-user' />
          </Link>
        </div>
      </div>}
    </>
  )
}

export default Navigation
