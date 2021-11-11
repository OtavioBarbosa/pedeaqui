
import React, { useEffect, useState } from "react"
import { formatarDinheiro } from "../../utils/functions"

const ItemPedido = (props) => {

  const [item_pedido, setItemPedido] = useState(null)
  const [imagem_principal, setImagemPrincipal] = useState(null)

  const itemPedido = () => {
    return JSON.parse(item_pedido)
  }

  useEffect(() => {
    setItemPedido(props.item_pedido)
    let imagem_principal = JSON.parse(props.item_pedido).imagens.filter(i => i.principal)
    setImagemPrincipal(imagem_principal.length > 0 ? imagem_principal : [])
  }, [props.item_pedido])

  const carregarAdicionais = (adicional, i) => {
    return <div className="item-pedido-adicionados" key={i}>
      {adicional.adicional} ... <strong>{formatarDinheiro(adicional.valor)}</strong>
    </div>
  }

  const carregarAcompanhamentos = (acompanhamento, i) => {
    return <div className="item-pedido-adicionados" key={i}>
      {acompanhamento.acompanhamento} ... <strong>{formatarDinheiro(!acompanhamento.obrigatorio ? acompanhamento.valor : 0.00)}</strong>
    </div>
  }

  const carregarEscolhas = (escolha, i) => {
    return <div className="item-carrinho-adicionados" key={i}>
      {escolha.escolha}: <strong>{escolha.opcao}</strong>
    </div>
  }

  const excluirItem = async () => {
    await props.excluir_item()
  }

  return (
    <>
      {item_pedido && 
      <div className="item-pedido">
        <div className="item-pedido-informacoes">
          <div className="item-pedido-imagem">
            {imagem_principal.length > 0 && <img src={`${process.env.REACT_APP_BASE_URL}/${imagem_principal[0].imagem}`} alt={imagem_principal[0].nome_imagem}/>}
          </div>
          <div className="info-item-pedido">
            <div className="item-pedido-title"><strong>{itemPedido().item}</strong></div>
            <div className="item-pedido-valor"><strong>{formatarDinheiro(itemPedido().valor)}</strong></div>
            <div className="item-pedido-adicionados">
              {itemPedido().adicionais.length > 0 && itemPedido().adicionais.map(carregarAdicionais)}
              {itemPedido().acompanhamentos.length > 0 && itemPedido().acompanhamentos.map(carregarAcompanhamentos)}
              {itemPedido().escolhas.length > 0 && itemPedido().escolhas.map(carregarEscolhas)}
            </div>
            <div className="item-pedido-usuario"><strong>{itemPedido().nome}</strong></div>
          </div>
          <div className="item-pedido-acao-status">
            <div className={`item-pedido-status-${itemPedido().status.toLowerCase().replace(/ /g, '-')}`}><strong>{itemPedido().status}</strong></div>
            {itemPedido().status === "Em espera" && <div className="item-pedido-acao-remover" onClick={async () => {await excluirItem()}}><strong>Excluir</strong></div>}
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemPedido
