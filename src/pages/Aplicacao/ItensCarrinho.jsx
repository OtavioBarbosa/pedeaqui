
import React, { useEffect, useState } from "react"
import ItemCarrinho from "../../components/ItemCarrinho"
import { getCarrinho, getMesa } from "../../utils/storage"
import { formatarDinheiro } from "../../utils/functions"

const ItensCarrinho = (props) => {

  const [valor_total_carrinho, setValorTotalCarrinho] = useState(0)

  const carregarItens = (item, i) => {
    return <ItemCarrinho item_carrinho={JSON.stringify(item)} key={i} />
  }

  
  useEffect(() => {
    const calcularValorTotalCarrinho = () => {
      return getCarrinho().map(c => c.valor_total).reduce((x, y) => x + y, 0)
    }

    setValorTotalCarrinho(calcularValorTotalCarrinho())
  }, [props])

  return (
    <>
      <div className="itens-carrinho-mesa">
        <div>
          <label className="identificacao">Mesa {getMesa().identificacao}</label><br/>
          <label className="valor">{formatarDinheiro(valor_total_carrinho)}</label>
        </div>
      </div>
      
      {getCarrinho().map(carregarItens)}

      <div className="itens-carrinho-confirmar-pedido">
        Confirmar pedido
      </div>

      <div style={{height: '100px'}} />
    </>
  )
}

export default ItensCarrinho;
