
import React, { useEffect, useState } from "react"
import { getRota } from "../../utils/functions"

const ItemPedido = (props) => {

  const [item_pedido, setItemPedido] = useState(null)
  const [salao, setSalao] = useState(false)

  const itemPedido = () => {
    return JSON.parse(item_pedido)
  }

  useEffect(() => {
    setItemPedido(props.item_pedido)
    setSalao(getRota().pathname.indexOf('/area_administrativa/salao') > -1 ? true : false)
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
  
  const carregarEscolhas = (escolha, i) => {
    return <li className="extras" key={i}>
      {escolha.escolha}: <label className="extras-escolha">{escolha.opcao}.</label>
    </li>
  }


  return (
    <>
      {item_pedido && 
      <div className="item-pedido-area-administrativa">
        <div className="item-pedido-area-administrativa-card">
          <div className="mesa">Mesa {itemPedido().identificacao} {props.visualizar_setor ? ` - ${itemPedido().preparado_por}` : ''}</div>
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
            <div className="item-detalhes">
              Escolhas: 
              <ul>
                {itemPedido().escolhas.length === 0 && <li className="extras">Nenhum.</li>}
                {itemPedido().escolhas.length > 0 && itemPedido().escolhas.map(carregarEscolhas)}
              </ul>
            </div>
          </div>
          <div className="acao">
            <div className={`${itemPedido().status.toLowerCase().replace(/ /g, '-')}${itemPedido().status.toLowerCase().replace(/ /g, '-') === 'pronto' && salao ? '-salao' : ''}`} onClick={() => {
                if(itemPedido().status === 'Em espera') props.alterarStatus(itemPedido(), props.status.find(s => s.status === 'Preparando').id)
                if(itemPedido().status === 'Preparando') props.alterarStatus(itemPedido(), props.status.find(s => s.status === 'Pronto').id)
                if(itemPedido().status === 'Pronto' && salao) props.alterarStatus(itemPedido(), props.status.find(s => s.status === 'Entregue').id)
            }}>
              {itemPedido().status === 'Em espera' && 'Iniciar preparo'}
              {itemPedido().status === 'Preparando' && 'Pronto'}
              {itemPedido().status === 'Pronto' && !salao && 'Pronto'}
              {itemPedido().status === 'Pronto' && salao && 'Entregar'}
              {itemPedido().status === 'Entregue' && 'Entregue'}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemPedido
