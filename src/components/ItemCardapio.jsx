
import React, { useEffect, useState } from "react"
import { formatarDinheiro } from "../utils/functions"
import { Link } from "react-router-dom"

const ItemCardapio = (props) => {

  const [item_cardapio, setItemCardapio] = useState(null)
  const [imagem_principal, setImagemPrincipal] = useState(null)
  const [promocao, setPromocao] = useState(null)
  const [valor_item_cardapio, setValorItemCardapio] = useState(null)

  const itemCardapio = () => {
    return JSON.parse(item_cardapio)
  }

  useEffect(() => {
    setItemCardapio(props.item_cardapio)
    let imagem_principal = JSON.parse(props.item_cardapio).imagens.filter(i => i.principal)
    setImagemPrincipal(imagem_principal.length > 0 ? imagem_principal : [])
  }, [props.item_cardapio])

  useEffect(() => {

    const itemCardapio = JSON.parse(item_cardapio)
    let valor = 0
    if(item_cardapio && itemCardapio.promocoes.length > 0){
        valor = Math.min(itemCardapio.promocoes.map(p => p.valor))
        let promocao = itemCardapio.promocoes.find(p => p.valor === valor)
        setPromocao(promocao)
    }
    else if(item_cardapio){
        valor = itemCardapio.valor
    }
    
    setValorItemCardapio(valor)

  }, [item_cardapio])

  return (
    <>
      {item_cardapio && 
      <div className="item-cardapio">
        <div className="item-cardapio-informacoes">
          <div className="item-cardapio-imagem">
            {imagem_principal.length > 0 && <img src={`${process.env.REACT_APP_BASE_URL}/${imagem_principal[0].imagem}`} alt={imagem_principal[0].nome_imagem}/>}
          </div>
          <div className="info-item-cardapio">
            <div className="item-cardapio-title"><strong>{itemCardapio().item}</strong></div>
            <div className="item-cardapio-descricao">{itemCardapio().descricao}</div>
            <div className="item-cardapio-valor">
              {!promocao && <strong>{formatarDinheiro(valor_item_cardapio)}</strong>}
              {promocao && promocao.id && 
                <div>
                  <strong>{formatarDinheiro(valor_item_cardapio)}</strong>
                  <label className="valor-antigo-item-cardapio">{formatarDinheiro(itemCardapio().valor)}</label>
                </div>
              }
            </div>
          </div>
          <Link className="item-cardapio-add" to={`/pedeaqui/itemcardapio/${itemCardapio().id}`}>
            <i className="fas fa-plus-circle" />
          </Link>
        </div>
      </div>}
    </>
  )
}

export default ItemCardapio
