
import React, { useEffect, useState } from "react"
import imagem from '../../assets/imgs/imagem.svg'

const Categoria = (props) => {

  const [categoria, setCategoria] = useState(null)

  const getCategoria = () => {
    return JSON.parse(categoria)
  }

  useEffect(() => {
    setCategoria(props.categoria)
  }, [props.categoria])

  return (
    <>
      {categoria && 
      <div className="item-categoria">
        {getCategoria().imagem && <img className="imagem-categoria" src={`${process.env.REACT_APP_BASE_URL}/${getCategoria().imagem}`} alt={getCategoria().nome_imagem}/>}
        {!getCategoria().imagem && <img className="imagem-categoria" src={imagem} alt={`imagem`}/>}
        <div className="nome-categoria">{getCategoria().categoria}</div>
      </div>}
    </>
  )
}

export default Categoria
