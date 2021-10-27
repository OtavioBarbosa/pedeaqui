
import React, { useEffect, useState } from "react"

const Carousel = (props) => {

  const [imagens, setImagens] = useState(null)

  const getImagens = () => {
    return JSON.parse(imagens)
  }

  useEffect(() => {
    setImagens(props.imagens)
  }, [props.imagens])

  const carregarImagem = (imagem, i) => {
    return <div className="item-carousel" key={i}>
      <img className="imagem-carousel" src={`${process.env.REACT_APP_BASE_URL}/${imagem.imagem}`} alt={imagem.nome_imagem} />
    </div>
  }

  return (
    <>
      <div className="carousel">
        {imagens && getImagens().map(carregarImagem)}
      </div>
    </>
  )
}

export default Carousel
