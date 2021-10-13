import React, {useState} from "react"
import api from "../services/apis"
import { login } from "../services/auth"
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
import {campoInvalido, campoValido} from "../utils/functions"
import {createHmac} from "crypto"

const Login = (props) => {

  const [user, setUser] = useState('')
  const [senha, setSenha] = useState('')
  const [icone, setIcone] = useState('fa-eye')

  const conectar = async () => {

    var conectar = true

    if(!user){
      conectar = false
      campoInvalido('user')
    }
    if(!senha){
      conectar = false
      campoInvalido('senha')
    }

    if(conectar){
      try {
        const response = (await api.post("/login", {acesso: user, senha: createHmac('sha256', process.env.REACT_APP_SECRET).update(`${senha}`).digest('hex')})).data
        login(response.data.token)
        props.history.push('/pedeaqui/opcao')
      } catch (error) {
        Swal.fire({
          title: 'Erro',
          text: 'Problema ao fazer Login',
          icon: 'error'
        })
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
            <div className='agrupar-campo-icone' id='user'>
              <input type='text' className='campo-input' placeholder='Usuário' value={user} onChange={(evento) => {
                setUser(evento.target.value)
                campoValido('user')
              }} onKeyPress={(evento) => enter(evento)}/>
              <i className='icone fas fa-user' />
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
