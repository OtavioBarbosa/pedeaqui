
import React, {useState} from "react"

import {Link} from "react-router-dom"
import Swal from 'sweetalert2';
import {campoInvalido, campoValido, validarEmail} from "../functions/functions"

const Login = (props) => {

  const conectar = () => {
    var conectar = true

    if(!email){
      conectar = false
      campoInvalido('email')
    }
    if(!senha){
      conectar = false
      campoInvalido('senha')
    }

    if(conectar){
      if(!validarEmail(email)){
        Swal.fire({
          title: 'Erro',
          text: 'Formato do email inválido',
          icon: 'error'
        })
        campoInvalido('email')
      }
      else{
        props.history.push('/pedeaqui/opcao')
      }
    }
    else{
      Swal.fire({
        title: 'Erro',
        text: 'É necessário preencher todos os campos',
        icon: 'error'
      })
    }
  }

  const enter = (evento) => {
    if(evento.key === 'Enter'){
      conectar()
    }
  }

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [icone, setIcone] = useState('fa-eye')
  
  return (
    <>
      <div className='box-card'>
        <div className='login-image'>
          <div className='overlay-login'>
            <div className='titulo-login'>Conecte-se ao PedeAqui</div>
          </div>
        </div>  
        <div>
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
              }} />
            </div>
          </div>
          <div className='grupo-input'>
            <button className='btn-login-cadastrar' onClick={conectar}>Conectar</button>
          </div>
          <Link to='/cadastrarse' className='link-login'>Está com fome? Cadastre-se agora</Link>
        </div>
      </div>
    </>
  )
}

export default Login
