
import React from "react"

import {Link} from "react-router-dom"

class Cadastrar_se extends React.Component {

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
            <div className='titulo-cadastrarse'>Cadastre-se ao PedeAqui</div>
            <div>
                <div className='grupo-input'>
                    <div className='agrupar-campo-icone'>
                        <input className='campo-input' placeholder='Nome'/>
                        <label className='icone'>O</label>
                    </div>
                </div>
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
                    <div className='agrupar-campo-icone'>
                        <input className='campo-input' placeholder='Confirmar senha'/>
                        <label className='icone'>O</label>
                    </div>
                </div>
                <div className='grupo-input'>
                    <button className='btn-login-cadastrar'>Cadastrar</button>
                </div>
                <Link to='/login' className='link-login'>Conecte-se ao PedeAqui</Link>
            </div>
        </div>
      </>
    );
  }
}

export default Cadastrar_se;
