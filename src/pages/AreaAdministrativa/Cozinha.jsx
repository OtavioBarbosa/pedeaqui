
import React, { useEffect, useState } from "react"
import ItemPedido from "../../components/AreaAdministrativa/ItemPedido"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth"

const Cozinha = (props) => {

  const [usuario, setUsuario] = useState(null)
  const [estabelecimento, setEstabelecimento] = useState(null)
  const [itens_pedidos, setItensPedidos] = useState([])

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

    const getPedidos = async () => {
      if(estabelecimento){
        let retorno = (await api.get(`/itens_pedidos/estabelecimentos/cozinha/${estabelecimento.id}`)).data
        setItensPedidos(retorno.data)
      }
    }

    getPedidos()
  }, [estabelecimento])

  const carregarItensPedidos = (item_pedido, i) => {
    return <ItemPedido item_pedido={JSON.stringify(item_pedido)} key={i} />
  }
  
  return (
    <>
      <div className="conteudo-cozinha">
        {itens_pedidos && itens_pedidos.map(carregarItensPedidos)}
      </div>
    </>
  )
}

export default Cozinha;
