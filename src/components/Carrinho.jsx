
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getCarrinho } from "../utils/storage"
import { getRota } from "../utils/functions"

const Carrinho = (props) => {

  const history = useHistory()
  const [visualizar, setVisualizar] = useState(getCarrinho().length > 0)
  const [quantidade, setQuantidade] = useState(getCarrinho().length)

  useEffect(() => {
    setVisualizar(getCarrinho().length > 0)
    setQuantidade(getCarrinho().length)

    const visualizarCarrinho = () => {
      return getRota().pathname.indexOf(`/pedeaqui/carrinho`) > -1
    }

    if((getCarrinho().length > 0) === true){
      setVisualizar(!visualizarCarrinho())
    }
  }, [props])

  const visualizarCarrinho = () => {
    history.push(`/pedeaqui/carrinho`)
  } 


  return (
    <>
      {visualizar &&
        <div className="carrinho" onClick={() => {visualizarCarrinho()}}>
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
