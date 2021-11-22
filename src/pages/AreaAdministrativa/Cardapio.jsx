
import React, { useEffect, useState } from "react"
import ItemCardapio from "../../components/AreaAdministrativa/ItemCardapio"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth"
import { Link } from "react-router-dom"

const Cardapio = (props) => {

  const [usuario, setUsuario] = useState(null)
  const [estabelecimento, setEstabelecimento] = useState(null)
  const [itens_cardapio, setItensCardapio] = useState([])
  const [status] = useState([
    {id: 1, status: 'Todos'},
    {id: 2, status: 'Disponível'},
    {id: 3, status: 'Indisponível'},
  ])
  const [filtro, setFiltro] = useState(1)

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
    
    const getCardapio = async () => {
      if(estabelecimento){
        let retorno = (await api.get(`/itens/cardapios/area_administrativa/${estabelecimento.id}`)).data
        setItensCardapio(retorno.data)
      }
    }
    
    getCardapio()
  }, [estabelecimento])
  
  const carregarItensCardapio = (item_pedido, i) => {
    return <ItemCardapio item_cardapio={JSON.stringify(item_pedido)} key={i} />
  }
  
  return (
    <>
      <div className="conteudo-setores area-administrativa-cardapio">
        <Link className="add-item-cardapio">
          Adicionar item
        </Link>
        <select className="select-filtro-area-administrativa" value={filtro} onChange={(event) => {
          setFiltro(parseInt(event.target.value))
        }}>
          {status.map((s, i) => {
            return <option value={s.id} key={i}>{s.status}</option>
          })}
        </select>
        {itens_cardapio && itens_cardapio.filter(i => {
          if(filtro === 2){
            return !i.deleted_at
          }
          if(filtro === 3){
            return i.deleted_at
          }
          return i.id
        }).map(carregarItensCardapio)}
      </div>
    </>
  )
}

export default Cardapio;
