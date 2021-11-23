
import React, { useEffect, useState } from "react"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth"

const ItemCardapio = (props) => {

  const [usuario, setUsuario] = useState(null)
  const [estabelecimento, setEstabelecimento] = useState(null)
  const [item_cardapio, setItemCardapio] = useState([])

  useEffect(() => {
    const getUsuario = async () => {
      let retorno = (await api.get(`/usuarios/${decodeToken()}`)).data
      setUsuario(retorno.data[0])
    }
 
    getUsuario()
  }, [])

  useEffect(() => {
    const getEstabelecimento = async () => {
      if(usuario){
        let retorno = (await api.get(`/estabelecimentos/${usuario.estabelecimento_id}`)).data
        setEstabelecimento(retorno.data[0])
      }
    }

    getEstabelecimento()
  }, [usuario])

  useEffect(() => {
    
    const getItemCardapio = async () => {
      if(props.match.params.id){
        let retorno = (await api.get(`/itens/cardapios/detalhe/${props.match.params.id}`)).data
        setItemCardapio(retorno.data)
      }
    }
    
    getItemCardapio()
  }, [props])
    
  return (
    <>
      {item_cardapio && <div className="box-card-detalhe-item-cardapio">
        <p className="titulo">Item do cardápio</p>
        <div>
          <div className="campo">
            <div className='grupo-input'>
              <div className='agrupar-campo-icone'>
                <input type='text' className='campo-input' placeholder='Item' defaultValue={item_cardapio.item} onChange={(event) => {
                  setItemCardapio({...item_cardapio, item: event.target.value})
                }}/>
                <i className='icone fas fa-keyboard' />
              </div>
            </div>
          </div>
          <div className="campo-2">
            <div className='grupo-input'>
              <div className='agrupar-campo-icone'>
                <input type='text' className='campo-input' placeholder='Quantidade' defaultValue={item_cardapio.quantidade} onChange={(event) => {
                  setItemCardapio({...item_cardapio, quantidade: event.target.value})
                }}/>
                <i className='icone fas fa-sort-numeric-down' />
              </div>
            </div>
            <div className='grupo-input'>
              <div className='agrupar-campo-icone'>
                <input type='text' className='campo-input' placeholder='Serve' defaultValue={item_cardapio.serve} onChange={(event) => {
                  setItemCardapio({...item_cardapio, serve: event.target.value})
                }}/>
                <i className='icone fas fa-sort-numeric-down' />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="campo">
            <div className='grupo-input'>
              <div className='agrupar-campo-icone'>
                <input type='text' className='campo-input' placeholder='Usuário' defaultValue={item_cardapio.valor} onChange={(event) => {
                  setItemCardapio({...item_cardapio, valor: event.target.value})
                }}/>
                <i className='icone fas fa-dollar-sign' />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ItemCardapio;
