
import React, { useEffect, useState } from "react"
import { formatarDinheiro } from "../../utils/functions"
import { Link } from "react-router-dom"

const ItemCardapio = (props) => {

  const [item_cardapio, setItemCardapio] = useState(null)

  const itemCardapio = () => {
    return JSON.parse(item_cardapio)
  }

  useEffect(() => {
    setItemCardapio(props.item_cardapio)
  }, [props.item_cardapio])

  const carregarAdicionais = (adicional, i) => {
    return <li className="extras" key={i}>
      {adicional.adicional}.
    </li>
  }

  const carregarAcompanhamentos = (acompanhamento, i) => {
    return <li className="extras" key={i}>
      {acompanhamento.acompanhamento}{acompanhamento.obrigatorio ? ` - obrigatório` : ''}.
    </li>
  }
  
  const carregarEscolhas = (escolha, i) => {
    return <li className="extras" key={i}>
      {escolha.escolha}.
    </li>
  }
  
  const carregarPromocoes = (promocao, i) => {
    return <li className="extras" key={i}>
      <label className="extras-escolha">{formatarDinheiro(promocao.valor)}.</label>
    </li>
  }


  return (
    <>
      {item_cardapio && 
      <div className="item-cardapio-area-administrativa">
        <div className="item-cardapio-area-administrativa-card">
          <div className="detalhes">
            <div className="item">{itemCardapio().item}</div>
            <div className="item-valor">{formatarDinheiro(itemCardapio().valor)}</div>
            <div className="item-detalhes">
              Promoções: 
              <ul>
                {itemCardapio().promocoes.length === 0 && <li className="extras">Nenhuma.</li>}
                {itemCardapio().promocoes.length > 0 && itemCardapio().promocoes.map(carregarPromocoes)}
              </ul>
            </div>
            <div className="item-detalhes">
              Acompanhamentos: 
              <ul>
                {itemCardapio().acompanhamentos.length === 0 && <li className="extras">Nenhum.</li>}
                {itemCardapio().acompanhamentos.length > 0 && itemCardapio().acompanhamentos.map(carregarAcompanhamentos)}
              </ul>
            </div>
            <div className="item-detalhes">
              Adicionais: 
              <ul>
                {itemCardapio().adicionais.length === 0 && <li className="extras">Nenhum.</li>}
                {itemCardapio().adicionais.length > 0 && itemCardapio().adicionais.map(carregarAdicionais)}
              </ul>
            </div>
            <div className="item-detalhes">
              Escolhas: 
              <ul>
                {itemCardapio().escolhas.length === 0 && <li className="extras">Nenhuma.</li>}
                {itemCardapio().escolhas.length > 0 && itemCardapio().escolhas.map(carregarEscolhas)}
              </ul>
            </div>
          </div>
          <div className="acao">
            <Link className="item-cardapio-detalhes">
              Detalhes
            </Link>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemCardapio
