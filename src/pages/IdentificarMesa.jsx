import React, {useState} from "react"
import QrReader from 'react-qr-reader'

const IdentificarMesa = (props) => {

  const [opcao, setOpcao] = useState(1)
  const [codigo, setCodigo] = useState('')

  const identificarCodigo = (code) => {
    console.log(code)
  }

  const qrCode = (code) => {
    if(code){
      setCodigo(code)
      identificarCodigo(code)
    }
  }
  
  const errorQrCode = (erro) => {
    console.log(erro)
  }

  return (
    <>
      <div className="identificar-mesa">
        <div className="tab">
          <button className={`${opcao === 1 ? 'tabpane-active' : 'tabpane'}`} onClick={() => {setOpcao(1)}}>
            Ler QR Code
          </button>
          <button className={`${opcao === 2 ? 'tabpane-active' : 'tabpane'}`} onClick={() => {setOpcao(2)}}>
            Informar código
          </button>
        </div>
        {opcao === 1 && 
          <div className="qr-code" style={{marginTop: '10%'}}>
            <QrReader
              delay={300}
              onError={errorQrCode}
              onScan={qrCode}
            />
          </div>
        }
        {opcao === 2 && 
          <div style={{marginTop: '10%'}}>
            <div className='grupo-input'>
              <div className='agrupar-campo-icone' id='codigo'>
                <input type='text' className='campo-input' placeholder='Código da mesa' maxLength={6} value={codigo} onChange={(evento) => {
                  setCodigo(evento.target.value)
                  if(evento.target.value.length === 6) identificarCodigo(evento.target.value)
                }}/>
                <i className='icone fas fa-keyboard' />
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default IdentificarMesa
