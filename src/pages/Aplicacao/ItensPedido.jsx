
import React, { useEffect, useState } from "react"
import ItemPedido from "../../components/Aplicacao/ItemPedido"
import { getMesa, getPedido } from "../../utils/storage"
import { formatarDinheiro } from "../../utils/functions"
import api from "../../services/apis"

const ItensPedido = (props) => {

  const [valor_total_pedido, setValorTotalPedido] = useState(0)  
  const [itens_pedido, setItensPedido] = useState([])  

  const carregarItens = (item, i) => {
    return <ItemPedido item_pedido={JSON.stringify(item)} excluir_item={async () => {await excluirItem(item)}} key={i} />
  }

  const getItensPedido = async () => {
    const retorno = (await api.get(`/itens_pedidos/${getPedido()}`)).data
    setItensPedido(retorno.data.itens_pedidos)
    setValorTotalPedido(retorno.data.valor_total)
  } 

  useEffect(() => {
    const getItensPedido = async () => {
      const retorno = (await api.get(`/itens_pedidos/${getPedido()}`)).data
      setItensPedido(retorno.data.itens_pedidos)
      setValorTotalPedido(retorno.data.valor_total)
    } 

    getItensPedido()
  }, [])

  const excluirItem = async (item) => {
    const retorno = await api.delete(`/itens_pedidos/${item.id}`)

    if(retorno.status === 204){
      await getItensPedido()
    }
  }
  
  return (
    <>
      <div className="itens-pedido-mesa">
        <div>
          <label className="identificacao">Mesa {getMesa().identificacao}</label><br/>
          <label className="valor">{formatarDinheiro(valor_total_pedido)}</label>
        </div>
      </div>
      
      {itens_pedido.map(carregarItens)}

      <div style={{height: '100px'}} />
    </>
  )
}

export default ItensPedido;
