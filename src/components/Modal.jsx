
import React, {useEffect, useState} from "react"

const Modal = (props) => {

    if(props.show){
        document.getElementsByClassName('modal')[0].style.display = 'block'
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    }

    const fecharModal = () => {
        document.getElementsByClassName('modal')[0].style.display = 'none'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
        props.fechar(false)
    }

    const [header, setHeader] = useState('')
    const [body, setBody] = useState('')
    const [footer] = useState(<button onClick={fecharModal} className='btn-fechar-modal'>Fechar</button>)

    useEffect(() => {
        setHeader(props.header)
        setBody(props.body)
    }, [props.header, props.body, props.show])
  
    return (
        <>
            <div className='modal'>
                <div className='modal-conteudo'>
                    <i className='fas fa-times fechar-modal' onClick={fecharModal}/>
                    <div className='modal-header'>
                        {header}
                    </div>
                    <div className='modal-body'>
                        {body}
                    </div>
                    <div className='modal-footer'>
                        {footer}
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Modal
