
import React, { useEffect, useState } from "react"
import { formatarDinheiro } from "../utils/functions"

const ItemCardapio = (props) => {

  const [item_cardapio, setItemCardapio] = useState(null)
  const [imagem_principal, setImagemPrincipal] = useState(null)

  const itemCardapio = () => {
    return JSON.parse(item_cardapio)
  }

  useEffect(() => {
    setItemCardapio(props.item_cardapio)
    let imagem_principal = JSON.parse(props.item_cardapio).imagens.filter(i => i.principal)
    setImagemPrincipal(imagem_principal.length > 0 ? imagem_principal : [])
  }, [props.item_cardapio])

  return (
    <>
      {item_cardapio && 
      <div className="item-cardapio">
        {imagem_principal.length > 0 && <img className="item-cardapio-imagem" src={`${process.env.REACT_APP_BASE_URL}/${imagem_principal[0].imagem}`} alt={imagem_principal[0].nome_imagem}/>}
        <div className="item-cardapio-informacoes">
          <div className="info-item-cardapio">
            <div className="item-cardapio-title"><strong>{itemCardapio().item}</strong></div>
            <div className="item-cardapio-descricao">{itemCardapio().descricao}</div>
            <div className="item-cardapio-valor"><strong>{formatarDinheiro(itemCardapio().valor)}</strong></div>
          </div>
          <i className="fas fa-plus-circle item-cardapio-add" />
        </div>
      </div>}
    </>
  )
}

export default ItemCardapio
