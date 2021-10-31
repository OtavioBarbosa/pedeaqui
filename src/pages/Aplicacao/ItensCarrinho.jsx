
import React, { useEffect, useState } from "react"
import ItemCarrinho from "../../components/ItemCarrinho"
import { getCarrinho } from "../../utils/storage"
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
      <div>
        {formatarDinheiro(valor_total_carrinho)}
      </div>
      
      {getCarrinho().map(carregarItens)}
    </>
  )
}

export default ItensCarrinho;
