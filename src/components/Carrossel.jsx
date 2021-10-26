
import React, { useEffect, useState } from "react"

const Carrossel = (props) => {

  const [imagens, setImagens] = useState(null)

  const getImagens = () => {
    return JSON.parse(imagens)
  }

  useEffect(() => {
    setImagens(props.imagens)
  }, [props.imagens])

  const carregarImagem = (imagem, i) => {
    return <>
      <img className="imagem-carrossel" src={`${process.env.REACT_APP_BASE_URL}/${imagem.imagem}`} alt={imagem.nome_imagem} key={i}/>
    </>
  }

  return (
    <>
      <div className="carrossel">
        {imagens && getImagens().map(carregarImagem)}
      </div>
    </>
  )
}

export default Carrossel
