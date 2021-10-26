
import React, { useEffect, useState } from "react"
import Carrossel from "../components/Carrossel"
import api from "../services/apis"

const DetalheItemCardapio = (props) => {

    const [item_cardapio, setItemCardapio] = useState(null)

    const itemCardapio = () => {
        return JSON.parse(item_cardapio)
    }
    
    useEffect(() => {
        const getItemCardapio = async () => {
            let retorno = (await api.get(`/itens/cardapios/detalhe/${props.match.params.id}`)).data
            setItemCardapio(JSON.stringify(retorno.data))
        } 

        getItemCardapio()
    }, [props.match.params.id])

    const carregarCarrosel = () => {
        return <Carrossel imagens={item_cardapio ? JSON.stringify(itemCardapio().imagens) : `[]`} key={`carrossel`} />
    }

    return (
        <>
            {carregarCarrosel()}
        </>
    )
}

export default DetalheItemCardapio
