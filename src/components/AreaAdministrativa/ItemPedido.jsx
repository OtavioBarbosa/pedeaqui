
import React, { useEffect, useState } from "react"
// import { formatarDinheiro } from "../../utils/functions"

const ItemPedido = (props) => {

  const [item_pedido, setItemPedido] = useState(null)

  const itemPedido = () => {
    return JSON.parse(item_pedido)
  }

  useEffect(() => {
    setItemPedido(props.item_pedido)
  }, [props.item_pedido])

  const carregarAdicionais = (adicional, i) => {
    return <li className="extras" key={i}>
      {adicional.adicional}.
    </li>
  }

  const carregarAcompanhamentos = (acompanhamento, i) => {
    return <li className="extras" key={i}>
      {acompanhamento.acompanhamento}.
    </li>
  }


  return (
    <>
      {item_pedido && 
      <div className="item-pedido-area-administrativa">
        <div className="item-pedido-area-administrativa-card">
          <div className="mesa">Mesa {itemPedido().identificacao}</div>
          <div className="detalhes">
            <div className="item">{itemPedido().item}</div>
            <div className="item-detalhes observacao">Observação: <label className="descricao-observacao">{itemPedido().observacao ? itemPedido().observacao : 'Nenhuma'}.</label></div>
            <div className="item-detalhes">
              Acompanhamentos: 
              <ul>
                {itemPedido().acompanhamentos.length === 0 && <li className="extras">Nenhum.</li>}
                {itemPedido().acompanhamentos.length > 0 && itemPedido().acompanhamentos.map(carregarAcompanhamentos)}
              </ul>
            </div>
            <div className="item-detalhes">
              Adicionais: 
              <ul>
                {itemPedido().adicionais.length === 0 && <li className="extras">Nenhum.</li>}
                {itemPedido().adicionais.length > 0 && itemPedido().adicionais.map(carregarAdicionais)}
              </ul>
            </div>
          </div>
          <div className="acao">
            <div className={`${itemPedido().status.toLowerCase().replace(/ /g, '-')}`}>
              {itemPedido().status === 'Em espera' && 'Iniciar preparo'}
              {itemPedido().status === 'Preparando' && 'Pronto'}
              {itemPedido().status === 'Pronto' && 'Pronto'}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemPedido
