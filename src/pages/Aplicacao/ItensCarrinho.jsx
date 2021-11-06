
import React, { useEffect, useState } from "react"
import ItemCarrinho from "../../components/Aplicacao/ItemCarrinho"
import { getCarrinho, getMesa, setCarrinho, getPedido } from "../../utils/storage"
import { formatarDinheiro } from "../../utils/functions"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth"

const ItensCarrinho = (props) => {

  const [valor_total_carrinho, setValorTotalCarrinho] = useState(0)
  const [itens_carrinho, setItensCarrinho] = useState(getCarrinho())
  const [pedido_has_usuario, setPedidoHasUsuario] = useState(null)

  const carregarItens = (item, i) => {
    return <ItemCarrinho item_carrinho={JSON.stringify(item)} excluir_item={() => {excluirItem(i)}} key={i} />
  }
  
  const calcularValorTotalCarrinho = () => {
    return getCarrinho().map(c => c.valor_total).reduce((x, y) => x + y, 0)
  }

  useEffect(() => {
    const calcularValorTotalCarrinho = () => {
      return getCarrinho().map(c => c.valor_total).reduce((x, y) => x + y, 0)
    }

    setValorTotalCarrinho(calcularValorTotalCarrinho())
  }, [props])

  useEffect(() => {
    const getUsuarios = async () => {
      if(getPedido()){
        let retorno = (await api.get(`/pedidos/usuarios/${getPedido()}`)).data
        setPedidoHasUsuario(retorno.data.find(r => r.usuario_id === decodeToken()))
      }
    }
    getUsuarios()
  }, [])
  
  const excluirItem = (index) => {
    let carrinho = getCarrinho()
    carrinho.splice(index, 1)
    setCarrinho(JSON.stringify(carrinho))
    setItensCarrinho(carrinho)
    setValorTotalCarrinho(calcularValorTotalCarrinho())
  }
  
  const confirmarPedido = () => {
    itens_carrinho.map(async (item_carrinho, i) => {
      let requisicao = {
        indice: i,
        item_cardapio_id: item_carrinho.id,
        pedido_has_usuario_id: pedido_has_usuario.id,
        status_pedido_id: 1,
        promocao_id: item_carrinho.promocao && item_carrinho.promocao.id ? item_carrinho.promocao.id : null,
        observacao: item_carrinho.observacao,
        adicionais: item_carrinho.adicionais, 
        acompanhamentos: item_carrinho.acompanhamentos,
        adicionais_obrigatorios: item_carrinho.adicionais_obrigatorios, 
        acompanhamentos_obrigatorios: item_carrinho.acompanhamentos_obrigatorios 
      }
      
      let retorno = (await api.post(`/itens_pedidos`, requisicao))
      
      if(retorno.status === 201){
        let carrinho = getCarrinho()
        carrinho.splice(i, 1)
        carrinho.splice(i, 0, 'OK')
        setCarrinho(JSON.stringify(carrinho))
      }
      
      if(getCarrinho().filter(c => c === 'OK').length === itens_carrinho.length){
        setCarrinho(JSON.stringify([]))
        setItensCarrinho(getCarrinho())
        setValorTotalCarrinho(calcularValorTotalCarrinho())
      }

      return null
    })
  }

  return (
    <>
      <div className="itens-carrinho-mesa">
        <div>
          <label className="identificacao">Mesa {getMesa().identificacao}</label><br/>
          <label className="valor">{formatarDinheiro(valor_total_carrinho)}</label>
        </div>
      </div>
      
      {itens_carrinho.map(carregarItens)}

      <div className="itens-carrinho-confirmar-pedido" onClick={() => {confirmarPedido()}}>
        Confirmar pedido
      </div>

      <div style={{height: '100px'}} />
    </>
  )
}

export default ItensCarrinho;
