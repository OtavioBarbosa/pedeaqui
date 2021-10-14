
import React, {useState} from "react"

import {Link} from "react-router-dom"
import swal from 'sweetalert2'
import {campoInvalido, campoValido, validarEmail} from "../utils/functions"

const Cadastrar_se = (props) => {

  const cadastrar = () => {
    var conectar = true

    if(!nome){
      conectar = false
      campoInvalido('nome')
    }
    if(!email){
      conectar = false
      campoInvalido('email')
    }
    if(!senha){
      conectar = false
      campoInvalido('senha')
    }
    if(!confirmar_senha){
      conectar = false
      campoInvalido('confirmar_senha')
    }
  

    if(conectar){
      if(!validarEmail(email)){
        swal.fire({
          title: 'Erro',
          text: 'Formato do email inválido',
          icon: 'error'
        })
        campoInvalido('email')
      }
      else if(senha !== confirmar_senha){
        swal.fire({
          title: 'Erro',
          text: 'Senhas não combinam, verifique se digitou corretamente',
          icon: 'error'
        })
        campoInvalido('confirmar_senha')
      }
      else {
        swal.fire({
          title: 'Cadastrado',
          text: 'Registro criado com sucesso',
          icon: 'success'
        })
        limparFormulario()
      }
    }
    else{
      swal.fire({
        title: 'Aviso',
        text: 'É necessário preencher todos os campos',
        icon: 'warning'
      })
    }
  }

  const limparFormulario = () => {
    setNome('')
    setEmail('')
    setSenha('')
    setConfirmarSenha('')
    campoValido('nome')
    campoValido('email')
    campoValido('senha')
    campoValido('confirmar_senha')
  }

  const enter = (evento) => {
    if(evento.key === 'Enter'){
      cadastrar()
    }
  }

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar_senha, setConfirmarSenha] = useState('')
  const [icone, setIcone] = useState('fa-eye')
  const [icone_confirmar, setIconeConfirmar] = useState('fa-eye')

  return (
    <>
      <div className='box-card'>
          <div className='titulo-cadastrarse'>Cadastre-se ao PedeAqui</div>
          <div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='nome'>
                      <input type='text' className='campo-input' placeholder='Nome' value={nome} onChange={(evento) => {
                          setNome(evento.target.value)
                          campoValido('nome')
                      }} onKeyPress={(evento) => enter(evento)}/>
                      <i className='icone fas fa-user' />
                  </div>
              </div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='email'>
                      <input type='email' className='campo-input' placeholder='Email' value={email} onChange={(evento) => {
                          setEmail(evento.target.value)
                          campoValido('email')
                      }} onKeyPress={(evento) => enter(evento)}/>
                      <i className='icone fas fa-envelope' />
                  </div>
              </div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='senha'>
                      <input type='password' className='campo-input' placeholder='Senha' name='senha' value={senha} onChange={(evento) => {
                          setSenha(evento.target.value)
                          campoValido('senha')
                      }} onKeyPress={(evento) => enter(evento)}/>
                      <i className={`icone-senha fas ${icone}`} onClick={() => {
                        if(icone === 'fa-eye'){
                          setIcone('fa-eye-slash')
                          document.getElementsByName('senha')[0].type = 'text'
                        }
                        else{
                          setIcone('fa-eye')
                          document.getElementsByName('senha')[0].type = 'password'
                        } 
                      }}/>
                  </div>
              </div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='confirmar_senha'>
                      <input type='password' className='campo-input' placeholder='Confirmar senha' name='senha_confirmar' value={confirmar_senha} onChange={(evento) => {
                          setConfirmarSenha(evento.target.value)
                          campoValido('confirmar_senha')
                      }} onKeyPress={(evento) => enter(evento)}/>
                      <i className={`icone-senha fas ${icone_confirmar}`} onClick={() => {
                        if(icone_confirmar === 'fa-eye'){
                          setIconeConfirmar('fa-eye-slash')
                          document.getElementsByName('senha_confirmar')[0].type = 'text'
                        }
                        else{
                          setIconeConfirmar('fa-eye')
                          document.getElementsByName('senha_confirmar')[0].type = 'password'
                        } 
                      }}/>
                  </div>
              </div>
              <div className='grupo-input'>
                  <button className='btn-login-cadastrar' onClick={cadastrar}>Cadastrar</button>
              </div>
              <Link to='/login' className='link-login'>Conecte-se ao PedeAqui</Link>
          </div>
      </div>
    </>
  )
}

export default Cadastrar_se
