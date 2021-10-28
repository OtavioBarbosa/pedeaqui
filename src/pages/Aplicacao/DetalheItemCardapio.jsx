
import React, { useEffect, useState } from "react"
import Carousel from "../../components/Carousel"
import api from "../../services/apis"
import { formatarDinheiro } from "../../utils/functions"

const DetalheItemCardapio = (props) => {

    const [item_cardapio, setItemCardapio] = useState(null)
    const [observacao, setObservacao] = useState('')
    const [quantidade, setQuantidade] = useState(1)

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

    const carregarCarousel = () => {
        return <Carousel imagens={item_cardapio ? JSON.stringify(itemCardapio().imagens) : `[]`} key={`carousel`} />
    }

    const carregarAdicionais = (adicional, i) => {
        return <>
            <div className="opcoes" key={i}>
                <div>
                    <p className="nome-opcao">{adicional.adicional}</p>
                    <p className="valor-opcao">{formatarDinheiro(adicional.valor)}</p>
                </div>
                <div className="icone-opcao">
                    <i className="fas fa-plus" />
                </div>
            </div>
            {i+1 !== itemCardapio().adicionais.length && <hr className="separar-itens"/>}
        </>
    }
    
    const carregarAcompanhamentos = (acompanhamento, i) => {
        return <>
            <div className="opcoes" key={i}>
                <div>
                    <p className="nome-opcao">{acompanhamento.acompanhamento}</p>
                    <p className="valor-opcao">{formatarDinheiro(acompanhamento.valor)}</p>
                </div>
                <div className="icone-opcao">
                    <i className="fas fa-plus" />
                </div>
            </div>
            {i+1 !== itemCardapio().acompanhamentos.length && <hr className="separar-itens"/>}
        </>
    }

    return (
        <>
            {carregarCarousel()}
            
            <div className="info-detalhe-item-cardapio">
                <p className="item-detalhe-item-cardapio">{item_cardapio && itemCardapio().item}</p>
                <p className="descricao-detalhe-item-cardapio">{item_cardapio && itemCardapio().descricao}</p>
                <p className="valor-detalhe-item-cardapio">{item_cardapio && formatarDinheiro(itemCardapio().valor)}</p>
            </div>

            {item_cardapio && itemCardapio().adicionais && 
                <div>
                    <p className="titulo-detalhe-item-cardapio">Adicionais</p>
                    {itemCardapio().adicionais.map(carregarAdicionais)}
                </div>
            }
            
            {item_cardapio && itemCardapio().acompanhamentos && 
                <div>
                    <p className="titulo-detalhe-item-cardapio">Acompanhamentos</p>
                    {itemCardapio().acompanhamentos.map(carregarAcompanhamentos)}
                </div>
            }

            <div>
                <p className="titulo-detalhe-item-cardapio">Observação</p>
                <div className="observacao-detalhe-item-cardapio">
                    <textarea rows={4} onChange={(evento) => {
                        setObservacao(evento.target.value)
                    }}/>
                </div>
            </div>
            
            <div className="adicionar-detalhe-item-cardapio">
                <p className="acao-adicionar-detalhe-item-cardapio"><strong>Adicionar</strong></p>
                <div className="valor-adicionar-item-cardapio">
                    <i className="fas fa-plus-square" />
                    <p className="quantidade-item-cardapio">{quantidade}</p>
                    <i className="fas fa-minus-square" />
                    <strong className="total-item-cardapio">{item_cardapio && formatarDinheiro(quantidade * itemCardapio().valor)}</strong>
                </div>
            </div>

            <div style={{height: '100px'}} />
        </>
    )
}

export default DetalheItemCardapio
