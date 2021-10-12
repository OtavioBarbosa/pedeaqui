
import React from "react"

const Opcao = (props) => {


  const cardapio = () => {
    props.history.push('/pedeaqui/estabelecimentos')
  }

  const identificarMesa = () => {
    props.history.push('/pedeaqui/identificarmesa')
  }

  return (
    <>
      <div className='fundo-opcao'>
          <div className='cardapio-image' onClick={cardapio}>
              <div className='overlay-opcao'>
                  <div className='titulo-opcao'>Cardápio</div>
              </div>
          </div> 
          <div className='conectar-mesa-image' onClick={identificarMesa}>
              <div className='overlay-opcao'>
                  <div className='titulo-opcao'>Identificar mesa</div>
              </div>
          </div> 
      </div>
    </>
  )
}

export default Opcao;
