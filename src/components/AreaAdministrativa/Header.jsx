
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import api from "../../services/apis"
import { decodeToken, logout } from "../../services/auth.js"

const Header = (props) => {

  const history = useHistory()

  const [estabelecimento, setEstabelecimento] = useState(null)

  useEffect(() => {
    const getEstabelecimento = async () => {
      let usuario = (await api.get(`/usuarios/${decodeToken()}`)).data
      let estabelecimento = (await api.get(`/estabelecimentos/${usuario.data[0].estabelecimento_id}`)).data
      setEstabelecimento(estabelecimento.data[0])
    }

    getEstabelecimento()
  }, [])

  const sair = () => {
    logout()
    history.push('/pedeaqui')
  }

  return (
    <>
      <div className='header-area-administrativa'>
        <div>
          {estabelecimento && estabelecimento.razao_social}
        </div>
        <div className="acao">
          <i className='fas fa-sign-out-alt' onClick={() => {sair()}}/>
          {/* <i className="fas fa-user-circle" />
          <i className="fas fa-caret-down" /> */}
        </div>
      </div>
    </>
  )
}

export default Header
