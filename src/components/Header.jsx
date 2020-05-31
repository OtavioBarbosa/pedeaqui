
import React from "react"

class Header extends React.Component {

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
        <div className='header'>
            <i className='fas fa-bars exibir-menu' />
            <div className='imagem-restaurante'></div>
        </div>
      </>
    );
  }
}

export default Header;
