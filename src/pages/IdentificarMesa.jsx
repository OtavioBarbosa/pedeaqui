import React, {useState} from "react"
import QrReader from "react-qr-reader"
import api from "../services/apis"
import Swal from 'sweetalert2'
import {decodeToken} from "../services/auth"

const IdentificarMesa = (props) => {

  const [opcao, setOpcao] = useState(1)
  const [codigo, setCodigo] = useState('')

  const identificarCodigo = async (code) => {
    let identificacao = (await api.post(`/mesas/identificar`, {codigo: code})).data

    if(identificacao.data.mesa.length === 0){
      await Swal.fire({
        title: 'Erro',
        text: 'Mesa não encontrada',
        icon: 'error'
      })
      setCodigo('')
      return false
    }

    localStorage.setItem('mesa_pedeaqui', JSON.stringify(identificacao.data.mesa[0]))

    if(identificacao.data.usuarios.find(u => u.usuario_id === decodeToken() && u.permitido)){
      localStorage.setItem('pedido_pedeaqui', identificacao.data.pedido[0].id)
      props.history.push(`/pedeaqui/cardapio/${identificacao.data.mesa[0].estabelecimento_id}`)
      return true
    }
    
    if(identificacao.data.usuarios.find(u => u.usuario_id === decodeToken() && !u.permitido)){
      await Swal.fire({
        title: 'Ok',
        text: 'Aguarde o administrador da mesa liberar seu acesso',
        icon: 'success'
      })
      localStorage.setItem('pedido_pedeaqui', identificacao.data.pedido[0].id)
      props.history.push(`/pedeaqui/cardapio/${identificacao.data.mesa[0].estabelecimento_id}`)
      return true
    }
    
    if(identificacao.data.pedido.length > 0){
      
      let acao = await Swal.fire({
        title: 'Em uso',
        text: 'Mesa está em uso, deseja prosseguir?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })
      
      if(acao.isConfirmed){
        await Swal.fire({
          title: 'Ok',
          text: 'Aguarde o administrador da mesa liberar seu acesso',
          icon: 'success'
        })
        localStorage.setItem('pedido_pedeaqui', identificacao.data.pedido[0].id)
        await api.post('/pedidos/usuarios', {pedido_id: identificacao.data.pedido[0].id, usuario_id: decodeToken(), admin: 0, permitido: 0})
        props.history.push(`/pedeaqui/cardapio/${identificacao.data.mesa[0].estabelecimento_id}`)
        return true
      }
      
      if(acao.isDismissed){
        await Swal.fire({
          title: 'Ok',
          text: 'Aguardamos você escolher outra mesa',
          icon: 'error'
        })
        setCodigo('')
        return false
      }
      
    }
    else{
      
      let acao = await Swal.fire({
        title: 'Se conectar',
        text: 'Deseja realmente utilizar essa mesa?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })
      
      if(acao.isDismissed){
        await Swal.fire({
          title: 'Ok',
          text: 'Aguardamos você escolher outra mesa',
          icon: 'error'
        })
        setCodigo('')
        return false
      }
      
    }
    
    let pedido = (await api.post('/pedidos', {mesa_id: identificacao.data.mesa[0].id})).data
    localStorage.setItem('pedido_pedeaqui', pedido.data)
    props.history.push(`/pedeaqui/cardapio/${identificacao.data.mesa[0].estabelecimento_id}`)
    return true
  }

  const qrCode = async (code) => {
    if(code && !codigo){
      setCodigo(code)
      await identificarCodigo(code)
    }
  }
  
  const erroQrCode = (erro) => {
    console.log(erro)
  }

  return (
    <>
      <div className="identificar-mesa">
        <div className="tab">
          <button className={`${opcao === 1 ? 'tabpane-active' : 'tabpane'}`} onClick={() => {setOpcao(1)}}>
            Ler QR Code
          </button>
          <button className={`${opcao === 2 ? 'tabpane-active' : 'tabpane'}`} onClick={() => {setOpcao(2)}}>
            Informar código
          </button>
        </div>
        {opcao === 1 && 
          <div className="qr-code" style={{marginTop: '10%'}}>
            <QrReader
              delay={300}
              onScan={qrCode}
              onError={erroQrCode}
            />
          </div>
        }
        {opcao === 2 && 
          <div style={{marginTop: '10%'}}>
            <div className='grupo-input'>
              <div className='agrupar-campo-icone' id='codigo'>
                <input type='text' className='campo-input' placeholder='Código da mesa' maxLength={6} value={codigo} onChange={(evento) => {
                  setCodigo(evento.target.value)
                  if(evento.target.value.length === 6) identificarCodigo(evento.target.value)
                }}/>
                <i className='icone fas fa-keyboard' />
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default IdentificarMesa
