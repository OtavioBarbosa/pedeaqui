
import React, { useEffect, useState } from "react"
import api from "../../services/apis"
import { decodeToken } from "../../services/auth.js"

const Header = (props) => {

  const [estabelecimento, setEstabelecimento] = useState(null)

  useEffect(() => {
    const getEstabelecimento = async () => {
      let usuario = (await api.get(`/usuarios/${decodeToken()}`)).data
      let estabelecimento = (await api.get(`/estabelecimentos/${usuario.data[0].estabelecimento_id}`)).data
      setEstabelecimento(estabelecimento.data[0])
    }

    getEstabelecimento()
  }, [])

  return (
    <>
      <div className='header-area-administrativa'>
        <div>
          {estabelecimento && estabelecimento.razao_social}
        </div>
        <div className="acao">
          <i className="fas fa-user-circle" />
          <i className="fas fa-caret-down" />
        </div>
      </div>
    </>
  )
}

export default Header
