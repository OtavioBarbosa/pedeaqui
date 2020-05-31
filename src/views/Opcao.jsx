
import React from "react"

class Opcao extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
      
  }

  cardapio = () => {
      this.props.history.push('/pedeaqui/restaurantes')
  }

  identificarMesa = () => {
      this.props.history.push('/cadastrarse')
  }

  render() {
    return (
      <>
        <div className='fundo-opcao'>
            <div className='cardapio-image' onClick={this.cardapio}>
                <div className='overlay-opcao'>
                    <div className='titulo-opcao'>Cardápio</div>
                </div>
            </div> 
            <div className='conectar-mesa-image' onClick={this.identificarMesa}>
                <div className='overlay-opcao'>
                    <div className='titulo-opcao'>Identificar mesa</div>
                </div>
            </div> 
        </div>
      </>
    );
  }
}

export default Opcao;
