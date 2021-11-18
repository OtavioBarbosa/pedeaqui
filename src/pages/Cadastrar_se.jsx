
import React, {useState} from "react"

import {Link} from "react-router-dom"
import swal from 'sweetalert2'
import {campoInvalido, campoValido, validarEmail} from "../utils/functions"
import {createHmac} from "crypto"
import api from "../services/apis"

const Cadastrar_se = (props) => {

  const cadastrar = async () => {
    var conectar = true

    if(!nome){
      conectar = false
      campoInvalido('nome')
    }
    if(!usuario){
      conectar = false
      campoInvalido('usuario')
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
        try{
          await api.post("/clientes/cadastrar_se", {
            nome: nome, 
            usuario: usuario, 
            email: email, 
            senha: createHmac('sha256', process.env.REACT_APP_SECRET).update(`${senha}`).digest('hex')
          })
  
          await swal.fire({
            title: 'Cadastrado',
            text: 'Registro criado com sucesso',
            icon: 'success'
          })
          
          props.history.push('/pedeaqui')
        }
        catch(error){
          if(error.response){
            await swal.fire({
              title: 'Erro ao criar usuário',
              text: error.response.data.error,
              icon: 'error'
            })
          }
        }
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

  const enter = (evento) => {
    if(evento.key === 'Enter'){
      cadastrar()
    }
  }

  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
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
                      <i className='icone fas fa-user-tie' />
                  </div>
              </div>
              <div className='grupo-input'>
                  <div className='agrupar-campo-icone' id='usuario'>
                      <input type='text' className='campo-input' placeholder='Usuário' value={usuario} onChange={(evento) => {
                          setUsuario(evento.target.value)
                          campoValido('usuario')
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
