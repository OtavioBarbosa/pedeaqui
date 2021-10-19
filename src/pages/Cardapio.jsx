
import React, {useEffect, useState} from "react"
import {getPedido} from "../utils/storage"
import api from "../services/apis"
import {decodeToken} from "../services/auth"
import Swal from 'sweetalert2'

const Cardapio = (props) => {

  const [usuarios, setUsuarios] = useState([])
  const [pedido_has_usuario, setPedidoHasUsuario] = useState({})
  const [nao_permitidos, setNaoPermitidos] = useState([])
  
  const permitirUsuario = async (pedido_has_usuario) => {
    let acao = await Swal.fire({
      title: 'Permitir',
      text: `Permitir o acesso do(a) ${pedido_has_usuario.nome} à mesa?`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      allowOutsideClick: false
    })

    if(acao.isConfirmed){
      await api.post(`/pedidos/usuarios/permitir/${pedido_has_usuario.id}`, {permitido: 1})
    }

    return null
  }

  const getUsuarios = async () => {
    let retorno = (await api.get(`/pedidos/usuarios/${getPedido()}`)).data
    verificarPermissao(retorno.data, usuarios)
    setUsuarios(retorno.data)
  }
  
  const verificarPermissao = (retorno, usuarios) => {
    let pedido_has_usuario = usuarios.find(u => u.usuario_id === decodeToken())
    let pedido_has_usuario_atualizado = retorno.find(u => u.usuario_id === decodeToken())
    if(pedido_has_usuario && pedido_has_usuario_atualizado && !pedido_has_usuario_atualizado.admin && !pedido_has_usuario.permitido && pedido_has_usuario_atualizado.permitido){
      Swal.fire({
        title: 'Ok',
        text: 'O administrador liberou seu acesso',
        icon: 'success'
      })
      return true
    }
    if(!pedido_has_usuario_atualizado.admin && !pedido_has_usuario_atualizado.permitido){
      Swal.fire({
        title: 'Aguarde',
        text: 'O administrador ainda não liberou seu acesso',
        icon: 'warning',
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false
      })
      return false
    }
    return false
  }

  useEffect(() => {
    setInterval(getUsuarios, 60000);
  }, [])
  
  useEffect(() => {
    const getUsuarios = async () => {
      let retorno = (await api.get(`/pedidos/usuarios/${getPedido()}`)).data
      verificarPermissao(retorno.data, [])
      setUsuarios(retorno.data)
      setPedidoHasUsuario(retorno.data.find(r => r.usuario_id === decodeToken()))
    }
    getUsuarios()
  }, [])


  useEffect(() => {
    const usuariosNaoPermitidos = () => {
      setNaoPermitidos(usuarios.filter(u => !u.permitido && !u.encerrado && u.usuario_id !== decodeToken()))
    }
    usuariosNaoPermitidos()
  }, [usuarios])
  
  useEffect(() => {
    nao_permitidos.map(async (nao_permitido) => {
      if(pedido_has_usuario.admin){
        await permitirUsuario(nao_permitido)
      }
      return null
    })
  }, [nao_permitidos, pedido_has_usuario])

  return (
    <>

    </>
  )
}

export default Cardapio
