
import React from "react"

import {Link} from "react-router-dom"

class Cadastrar_se extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      confirmar_senha: '',
      icone: 'fa-eye',
      icone_confirmar: 'fa-eye'
    }
  }

  componentDidMount(){
      
  }

  cadastrar = () => {
    var conectar = true

    if(!this.state.nome){
      conectar = false
      this.invalido('nome')
    }
    if(!this.state.email){
      conectar = false
      this.invalido('email')
    }
    if(!this.state.senha){
      conectar = false
      this.invalido('senha')
    }
    if(!this.state.confirmar_senha){
      conectar = false
      this.invalido('confirmar_senha')
    }
  

    if(conectar){
      if(this.state.email.indexOf('@') === -1 || this.state.email.substring(this.state.email.indexOf('@'), this.state.email.length).indexOf('.') === -1){
        alert('Email inválido')
        this.invalido('email')
      }
      else if(this.state.senha !== this.state.confirmar_senha){
        alert('Senha diferentes')
        this.invalido('confirmar_senha')
      }
      else {
        alert('Conectar-se')
      }
    }
    else{
      alert('Preencha os campos obrigatórios')
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

  render() {
    return (
      <>
        <div className='box-card'>
            <div className='titulo-cadastrarse'>Cadastre-se ao PedeAqui</div>
            <div>
                <div className='grupo-input'>
                    <div className='agrupar-campo-icone' id='nome'>
                        <input type='text' className='campo-input' placeholder='Nome' value={this.state.nome} onChange={(evento) => {
                            this.setState({nome: evento.target.value})
                            this.valido('nome')
                        }}/>
                        <i className='icone fas fa-user' />
                    </div>
                </div>
                <div className='grupo-input'>
                    <div className='agrupar-campo-icone' id='email'>
                        <input type='text' className='campo-input' placeholder='Email' value={this.state.email} onChange={(evento) => {
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
                        }}/>
                    </div>
                </div>
                <div className='grupo-input'>
                    <div className='agrupar-campo-icone' id='confirmar_senha'>
                        <input type='password' className='campo-input' placeholder='Confirmar senha' name='senha_confirmar' value={this.state.confirmar_senha} onChange={(evento) => {
                            this.setState({confirmar_senha: evento.target.value})
                            this.valido('confirmar_senha')
                        }}/>
                        <i className={'icone-senha fas ' + this.state.icone_confirmar} onClick={() => {
                          if(this.state.icone_confirmar === 'fa-eye'){
                            this.setState({icone_confirmar: 'fa-eye-slash'})
                            document.getElementsByName('senha_confirmar')[0].type = 'text';
                          }
                          else{
                            this.setState({icone_confirmar: 'fa-eye'})
                            document.getElementsByName('senha_confirmar')[0].type = 'password';
                          } 
                        }}/>
                    </div>
                </div>
                <div className='grupo-input'>
                    <button className='btn-login-cadastrar' onClick={this.cadastrar}>Cadastrar</button>
                </div>
                <Link to='/login' className='link-login'>Conecte-se ao PedeAqui</Link>
            </div>
        </div>
      </>
    );
  }
}

export default Cadastrar_se;
