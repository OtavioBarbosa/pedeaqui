
import React, {useState} from "react"

import {Link} from "react-router-dom"

const Cadastrar_se = (props) => {

  const cadastrar = () => {
    var conectar = true

    if(!nome){
      conectar = false
      invalido('nome')
    }
    if(!email){
      conectar = false
      invalido('email')
    }
    if(!senha){
      conectar = false
      invalido('senha')
    }
    if(!confirmar_senha){
      conectar = false
      invalido('confirmar_senha')
    }
  

    if(conectar){
      if(email.indexOf('@') === -1 || email.substring(email.indexOf('@'), email.length).indexOf('.') === -1){
        setHeader('Aviso')
        setBody('Formato do email inválido')
        abrirModal()
        invalido('email')
      }
      else if(senha !== confirmar_senha){
        setHeader('Aviso')
        setBody('Senhas não combinam, verifique se digitou corretamente')
        abrirModal()
        invalido('confirmar_senha')
      }
      else {
        alert('Cadastrado')
        limparFormulario()
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
  }

  const fecharModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none'
  }

  const limparFormulario = () => {
    setNome('')
    setEmail('')
    setSenha('')
    setConfirmarSenha('')
    valido('nome')
    valido('email')
    valido('senha')
    valido('confirmar_senha')
  }

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar_senha, setConfirmarSenha] = useState('')
  const [icone, setIcone] = useState('fa-eye')
  const [icone_confirmar, setIconeConfirmar] = useState('fa-eye')
  const [header, setHeader] = useState('')
  const [body, setBody] = useState('')
  const [footer] = useState(<button onClick={fecharModal} className='btn-fechar-modal'>Fechar</button>)

  return (
    <>
      <div className='box-card'>
          <div className='titulo-cadastrarse'>Cadastre-se ao PedeAqui</div>
          <div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='nome'>
                      <input type='text' className='campo-input' placeholder='Nome' value={nome} onChange={(evento) => {
                          setNome(evento.target.value)
                          valido('nome')
                      }}/>
                      <i className='icone fas fa-user' />
                  </div>
              </div>
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
                      }}/>
                      <i className={'icone-senha fas ' + icone} onClick={() => {
                        if(icone === 'fa-eye'){
                          setIcone('fa-eye-slash')
                          document.getElementsByName('senha')[0].type = 'text';
                        }
                        else{
                          setIcone('fa-eye')
                          document.getElementsByName('senha')[0].type = 'password';
                        } 
                      }}/>
                  </div>
              </div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='confirmar_senha'>
                      <input type='password' className='campo-input' placeholder='Confirmar senha' name='senha_confirmar' value={confirmar_senha} onChange={(evento) => {
                          setConfirmarSenha(evento.target.value)
                          valido('confirmar_senha')
                      }} onKeyPress={(evento) => {
                        if(evento.key === 'Enter'){
                          cadastrar()
                        }
                      }}/>
                      <i className={'icone-senha fas ' + icone_confirmar} onClick={() => {
                        if(icone_confirmar === 'fa-eye'){
                          setIconeConfirmar('fa-eye-slash')
                          document.getElementsByName('senha_confirmar')[0].type = 'text';
                        }
                        else{
                          setIconeConfirmar('fa-eye')
                          document.getElementsByName('senha_confirmar')[0].type = 'password';
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

export default Cadastrar_se;
