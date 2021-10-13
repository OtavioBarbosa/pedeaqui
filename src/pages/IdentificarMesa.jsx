import React, {useState} from "react"
import QrReader from "react-qr-reader"
import api from "../services/apis"
import Swal from 'sweetalert2'

const IdentificarMesa = (props) => {

  const [opcao, setOpcao] = useState(1)
  const [codigo, setCodigo] = useState('')

  const identificarCodigo = async (code) => {
    let mesa = (await api.post(`/mesas/identificar`, {codigo: code})).data
    if(mesa.data.length === 0){
      await Swal.fire({
        title: 'Erro',
        text: 'Mesa não encontrada',
        icon: 'error'
      })
      setCodigo('')
      return false
    }
    localStorage.setItem('mesa_pedeaqui', JSON.stringify(mesa.data[0]))
    props.history.push(`/pedeaqui/cardapio/${mesa.data[0].estabelecimento_id}`)
  }

  const qrCode = async (code) => {
    if(code && !codigo){
      setCodigo(code)
      await identificarCodigo(code)
    }
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
