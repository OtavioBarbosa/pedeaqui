
import React, { useEffect, useState } from "react"
import { getRota } from "../utils/functions"
import routes from "../routes.js"
import { useHistory } from "react-router"

const Header = (props) => {

  const history = useHistory()

  const [visualizar, setVisualizar] = useState(true)

  const visualizarHeader = () => {
    let routes_header = routes.filter(r => r.header)
    let resposta = routes_header.filter(r => {
      let split = r.path.split(':')
      return getRota().pathname.indexOf(`${r.layout}${split[0]}`) > -1
    }).length
    setVisualizar(resposta > 0 ? true : false)
  } 

  const visualizarBusca = () => {
    return getRota().pathname.indexOf(`/pedeaqui/cardapio`) > -1
  }

  const voltar = () => {
    if(getRota().pathname.indexOf(`/pedeaqui/cardapio`) === -1){
      history.go(-1)
    }
  }

  useEffect(() => {
    visualizarHeader()
  }, [props])

  return (
    <>
      {visualizar && <div className='header'>
        <i className='fas fa-angle-left voltar' onClick={() => {voltar()}}/>
        {visualizarBusca() && <i className='fas fa-search buscar' />}
      </div>}
    </>
  )
}

export default Header
