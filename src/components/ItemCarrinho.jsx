
import React, { useEffect, useState } from "react"
import { formatarDinheiro } from "../utils/functions"

const ItemCarrinho = (props) => {

  const [item_carrinho, setItemCarrinho] = useState(null)

  const itemCarrinho = () => {
    return JSON.parse(item_carrinho)
  }

  useEffect(() => {
    setItemCarrinho(props.item_carrinho)
  }, [props.item_carrinho])

  return (
    <>
      {item_carrinho && 
      <div className="item-carrinho">
        <div className="item-carrinho-informacoes">
          <div className="info-item-carrinho">
            <div className="item-carrinho-title"><strong>{itemCarrinho().item}</strong></div>
            <div className="item-carrinho-descricao">{itemCarrinho().descricao}</div>
            <div className="item-carrinho-valor">
              <strong>{formatarDinheiro(itemCarrinho().valor_total)}</strong>
            </div>
          </div>
          <div className="item-carrinho-remover">
            Excluir
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemCarrinho
