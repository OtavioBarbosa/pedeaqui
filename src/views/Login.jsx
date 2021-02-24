
import React, {useState} from "react"

import {Link} from "react-router-dom"

const Login = (props) => {

  const conectar = () => {
    var conectar = true

    if(!email){
      conectar = false
      invalido('email')
    }
    if(!senha){
      conectar = false
      invalido('senha')
    }

    if(conectar){
      if(email.indexOf('@') === -1 || email.substring(email.indexOf('@'), email.length).indexOf('.') === -1){
        setHeader('Aviso')
        setBody('Formato do email inválido')
        abrirModal()
        invalido('email')
      }
      else{
        props.history.push('/pedeaqui/opcao')
      }
    }
    else{
      setHeader('Aviso')
      setBody('É necessário preencher todos os campos')
      abrirModal()
    }
  }

  const invalido = (id) => {
    if(!document.getElementById(id).classList.contains('campo-obrigatorio')){
      document.getElementById(id).classList.add('campo-obrigatorio')
    } 
  }

  const valido = (id) => {
    if(document.getElementById(id).classList.contains('campo-obrigatorio')){
      document.getElementById(id).classList.remove('campo-obrigatorio')
    } 
  }

  const abrirModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'block'
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  }

  const fecharModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none'
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  }

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [icone, setIcone] = useState('fa-eye')
  const [header, setHeader] = useState('')
  const [body, setBody] = useState('')
  const [footer] = useState(<button onClick={fecharModal} className='btn-fechar-modal'>Fechar</button>)
  
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
                valido('email')
              }}/>
              <i className='icone fas fa-envelope' />
            </div>
          </div>
          <div className='grupo-input'>
            <div className='agrupar-campo-icone' id='senha'>
              <input type='password' className='campo-input' placeholder='Senha' name='senha' value={senha} onChange={(evento) => {
                setSenha(evento.target.value)
                valido('senha')
              }} onKeyPress={(evento) => {
                if(evento.key === 'Enter'){
                  conectar()
                }
              }}/>
              <i className={'icone-senha fas ' + icone} onClick={() => {
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
      <div className='modal'>
        <div className='modal-conteudo'>
          <i className='fas fa-times fechar-modal' onClick={fecharModal}/>
          <div className='modal-header'>
            {header}
          </div>
          <div className='modal-body'>
            {body}
          </div>
          <div className='modal-footer'>
            {footer}
          </div>
        </div>
      </div>  
    </>
  )
}

export default Login
