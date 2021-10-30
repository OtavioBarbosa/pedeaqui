
import React, { useEffect, useState } from "react"
import { getCarrinho } from "../utils/storage"

const Carrinho = (props) => {

  const [visualizar, setVisualizar] = useState(getCarrinho().length > 0)
  const [quantidade, setQuantidade] = useState(getCarrinho().length)

  useEffect(() => {
    setVisualizar(getCarrinho().length > 0)
    setQuantidade(getCarrinho().length)
  }, [props])

  return (
    <>
      {visualizar &&
        <div className="carrinho">
          <div className="carrinho-conteudo">
            <i className="fas fa-cart-plus" />
            <div className="carrinho-itens-quantidade">{quantidade}</div>
          </div>
        </div>
      }
    </>
  )
}

export default Carrinho
