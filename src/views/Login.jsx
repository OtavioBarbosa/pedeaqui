
import React from "react"

import {Link} from "react-router-dom"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
      
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
              <div className='agrupar-campo-icone'>
                <input className='campo-input' placeholder='Email'/>
                <label className='icone'>O</label>
              </div>
            </div>
            <div className='grupo-input'>
              <div className='agrupar-campo-icone'>
                <input className='campo-input' placeholder='Senha'/>
                <label className='icone'>O</label>
              </div>
            </div>
            <div className='grupo-input'>
              <button className='btn-login-cadastrar'>Conectar</button>
            </div>
            <Link to='/cadastrarse' className='link-login'>Está com fome? Cadastre-se agora</Link>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
