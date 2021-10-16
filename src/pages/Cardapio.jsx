
import React, {useEffect, useState} from "react"
import {getPedido} from "../utils/storage"
import api from "../services/apis"
import {getToken} from "../services/auth"
import Swal from 'sweetalert2'

const Cardapio = (props) => {

  const [usuarios, setUsuarios] = useState([])
  // const [nao_permitidos, setNaoPermitidos] = useState([])

  // const permitirUsuarios = () => {
  //   setNaoPermitidos(usuarios.filter(u => !u.permitido && !u.encerrado && u.usuario_id === getToken()))
    
  //   nao_permitidos.map(async (nao_permitido) => {
  //     await permitirUsuario(nao_permitido)
  //     return null
  //   })
  // }

  // const permitirUsuario = async (pedido_has_usuario) => {
  //   let acao = await Swal.fire({
  //     title: 'Permitir',
  //     text: `Permitir o acesso do(a) ${pedido_has_usuario.nome} à mesa?`,
  //     icon: 'warning',
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Sim',
  //     cancelButtonText: 'Não'
  //   })

  //   if(acao.isConfirmed){
  //     await Swal.fire({
  //       title: 'Ok',
  //       text: 'O administrador liberou seu acesso',
  //       icon: 'success'
  //     })
  //     await api.post(`/pedidos/usuarios/permitir/${pedido_has_usuario.id}`, {permitido: 1})
  //   }
  // }

  
  useEffect(() => {
    async function getUsuarios(){
      let retorno = (await api.get(`/pedidos/usuarios/${getPedido()}`)).data
      setUsuarios(retorno.data)
    }
    
    getUsuarios()
  }, [])

  return (
    <>

    </>
  )
}

export default Cardapio
