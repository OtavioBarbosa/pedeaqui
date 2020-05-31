
import React from "react"

import {Link} from "react-router-dom"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      icone: 'fa-eye',
      header: '',
      body: '',
      footer: <button onClick={this.fecharModal} className='btn-fechar-modal'>Fechar</button>
    }
  }

  componentDidMount(){
      
  }

  conectar = () => {
    var conectar = true

    if(!this.state.email){
      conectar = false
      this.invalido('email')
    }
    if(!this.state.senha){
      conectar = false
      this.invalido('senha')
    }

    if(conectar){
      if(this.state.email.indexOf('@') === -1 || this.state.email.substring(this.state.email.indexOf('@'), this.state.email.length).indexOf('.') === -1){
        this.setState({
          header: 'Aviso',
          body: 'Formato do email inválido'
        })
        this.abrirModal()
        this.invalido('email')
      }
      else{
        this.props.history.push('/pedeaqui/opcao')
      }
    }
    else{
      this.setState({
        header: 'Aviso',
        body: 'É necessário preencher todos os campos'
      })
      this.abrirModal()
    }
  }

  invalido = (id) => {
    if(!document.getElementById(id).classList.contains('campo-obrigatorio')){
      document.getElementById(id).classList.add('campo-obrigatorio')
    } 
  }

  valido = (id) => {
    if(document.getElementById(id).classList.contains('campo-obrigatorio')){
      document.getElementById(id).classList.remove('campo-obrigatorio')
    } 
  }

  abrirModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'block'
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  }

  fecharModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none'
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  }

  render() {
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
                <input type='email' className='campo-input' placeholder='Email' value={this.state.email} onChange={(evento) => {
                  this.setState({email: evento.target.value})
                  this.valido('email')
                }}/>
                <i className='icone fas fa-envelope' />
              </div>
            </div>
            <div className='grupo-input'>
              <div className='agrupar-campo-icone' id='senha'>
                <input type='password' className='campo-input' placeholder='Senha' name='senha' value={this.state.senha} onChange={(evento) => {
                  this.setState({senha: evento.target.value})
                  this.valido('senha')
                }} onKeyPress={(evento) => {
                  if(evento.key === 'Enter'){
                    this.conectar()
                  }
                }}/>
                <i className={'icone-senha fas ' + this.state.icone} onClick={() => {
                  if(this.state.icone === 'fa-eye'){
                    this.setState({icone: 'fa-eye-slash'})
                    document.getElementsByName('senha')[0].type = 'text';
                  }
                  else{
                    this.setState({icone: 'fa-eye'})
                    document.getElementsByName('senha')[0].type = 'password';
                  } 
                }} />
              </div>
            </div>
            <div className='grupo-input'>
              <button className='btn-login-cadastrar' onClick={this.conectar}>Conectar</button>
            </div>
            <Link to='/cadastrarse' className='link-login'>Está com fome? Cadastre-se agora</Link>
          </div>
        </div>
        <div className='modal'>
          <div className='modal-conteudo'>
            <i className='fas fa-times fechar-modal' onClick={this.fecharModal}/>
            <div className='modal-header'>
              {this.state.header}
            </div>
            <div className='modal-body'>
              {this.state.body}
            </div>
            <div className='modal-footer'>
              {this.state.footer}
            </div>
          </div>
        </div>  
      </>
    );
  }
}

export default Login;
