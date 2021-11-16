
import React, { useEffect, useState } from "react"
import ItemPedido from "../../components/AreaAdministrativa/ItemPedido"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth"

const Cozinha = (props) => {

  const [usuario, setUsuario] = useState(null)
  const [estabelecimento, setEstabelecimento] = useState(null)
  const [itens_pedidos, setItensPedidos] = useState([])
  const [status, setStatus] = useState([])
  const [filtro, setFiltro] = useState(1)

  useEffect(() => {
    const getUsuario = async () => {
      let retorno = (await api.get(`/usuarios/${decodeToken()}`)).data
      setUsuario(retorno.data[0])
    }
    
    const getStatus = async () => {
      let retorno = (await api.get(`/status/pedidos`)).data
      setStatus(retorno.data)
    }

    getStatus()
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
    
    const getPedidos = async () => {
      if(estabelecimento){
        let retorno = (await api.get(`/itens_pedidos/estabelecimentos/cozinha/${estabelecimento.id}`)).data
        setItensPedidos(retorno.data)
      }
    }
    
    getPedidos()
  }, [estabelecimento])
  
  useEffect(() => {
    setFiltro(status.length > 0 ? status.find(s => s.status === 'Em espera').id : 1)
  }, [status])
  
  const getPedidos = async () => {
    if(estabelecimento){
      let retorno = (await api.get(`/itens_pedidos/estabelecimentos/cozinha/${estabelecimento.id}`)).data
      setItensPedidos(retorno.data)
    }
  }

  const alterarStatusPedido = async (item_pedido, status_pedido_id) => {
    await api.put(`/itens_pedidos/status_pedido/${item_pedido.id}`, {status_pedido_id})
    await getPedidos()
  }

  const carregarItensPedidos = (item_pedido, i) => {
    return <ItemPedido item_pedido={JSON.stringify(item_pedido)} alterarStatus={alterarStatusPedido} status={status} key={i} />
  }
  
  return (
    <>
      <div className="conteudo-cozinha">
        <select className="select-filtro-area-administrativa" value={filtro} onChange={(event) => {
          setFiltro(parseInt(event.target.value))
        }}>
          {status.length > 0 && status.filter(s => s.status === 'Em espera' || s.status === 'Preparando' || s.status === 'Pronto').map((s, i) => {
            return <option value={s.id} key={i}>{s.status}</option>
          })}
        </select>
        {itens_pedidos && itens_pedidos.filter(i => i.status_pedido_id === filtro).map(carregarItensPedidos)}
      </div>
    </>
  )
}

export default Cozinha;
