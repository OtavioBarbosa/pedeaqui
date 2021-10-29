
import React, { useEffect, useState } from "react"
import Carousel from "../../components/Carousel"
import api from "../../services/apis"
import { formatarDinheiro } from "../../utils/functions"

const DetalheItemCardapio = (props) => {

    const [item_cardapio, setItemCardapio] = useState(null)
    const [observacao, setObservacao] = useState('')
    const [promocao, setPromocao] = useState(null)
    const [valor_item_cardapio, setValorItemCardapio] = useState(null)
    const [valor_total_item_cardapio, setValorTotalItemCardapio] = useState(null)

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
    
    useEffect(() => {

        const itemCardapio = JSON.parse(item_cardapio)
        let valor = 0
        if(item_cardapio && itemCardapio.promocoes.length > 0){
            valor = Math.min(itemCardapio.promocoes.map(p => p.valor))
            let promocao = itemCardapio.promocoes.find(p => p.valor === valor)
            setPromocao(promocao)
        }
        else if(item_cardapio){
            valor = itemCardapio.valor
        }
        
        setValorItemCardapio(valor)
        setValorTotalItemCardapio(valor)

    }, [item_cardapio])

    const carregarCarousel = () => {
        return <Carousel imagens={item_cardapio ? JSON.stringify(itemCardapio().imagens) : `[]`} key={`carousel`} />
    }

    const carregarAdicionais = (adicional, i) => {
        return <div key={i}>
            <div className="opcoes">
                <div>
                    <p className="nome-opcao">{adicional.adicional}</p>
                    <p className="valor-opcao">{formatarDinheiro(adicional.valor)}</p>
                </div>
                <div className="icone-opcao">
                    <i className="fas fa-plus" />
                </div>
            </div>
            {i+1 !== itemCardapio().adicionais.length && <hr className="separar-itens"/>}
        </div>
    }
    
    const carregarAcompanhamentos = (acompanhamento, i) => {
        return <div key={i}>
            <div className="opcoes">
                <div>
                    <p className="nome-opcao">{acompanhamento.acompanhamento}</p>
                    <p className="valor-opcao">{formatarDinheiro(acompanhamento.valor)}</p>
                </div>
                <div className="icone-opcao">
                    <i className="fas fa-plus" />
                </div>
            </div>
            {i+1 !== itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 0).length && <hr className="separar-itens"/>}
        </div>
    }
    
    const carregarAcompanhamentosObrigatorio = (acompanhamento, i) => {
        return <div key={i}>
            <div className="opcoes">
                <div>
                    <p className="nome-opcao">{acompanhamento.acompanhamento}</p>
                    <p className="valor-opcao">Acompanha o item</p>
                </div>
            </div>
            {i+1 !== itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 1).length && <hr className="separar-itens"/>}
        </div>
    }

    return (
        <>
            {carregarCarousel()}
            
            <div className="info-detalhe-item-cardapio">
                <p className="item-detalhe-item-cardapio">{item_cardapio && itemCardapio().item}</p>
                <p className="descricao-detalhe-item-cardapio">{item_cardapio && itemCardapio().descricao}</p>
                {item_cardapio && <div>
                    {!promocao && <p className="valor-detalhe-item-cardapio"><strong>{formatarDinheiro(valor_item_cardapio)}</strong></p>}
                    {promocao && promocao.id && 
                        <p className="valor-detalhe-item-cardapio">
                            <strong>{formatarDinheiro(valor_item_cardapio)}</strong>
                            <label className="valor-antigo-item-cardapio">{formatarDinheiro(itemCardapio().valor)}</label>
                        </p>
                    }
                </div>}
            </div>

            {item_cardapio && itemCardapio().adicionais.length > 0 && 
                <div>
                    <p className="titulo-detalhe-item-cardapio">Adicionais</p>
                    {itemCardapio().adicionais.map(carregarAdicionais)}
                </div>
            }
            
            {item_cardapio && itemCardapio().acompanhamentos.length > 0 && itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 0).length > 0 &&
                <div>
                    <p className="titulo-detalhe-item-cardapio">Acompanhamentos adicionais</p>
                    {itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 0).map(carregarAcompanhamentos)}
                </div>
            }
            
            {item_cardapio && itemCardapio().acompanhamentos.length > 0 && itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 1).length > 0 &&
                <div>
                    <p className="titulo-detalhe-item-cardapio">Acompanhamentos</p>
                    {itemCardapio().acompanhamentos.filter(a => a.obrigatorio === 1).map(carregarAcompanhamentosObrigatorio)}
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
                    <strong className="total-item-cardapio">{item_cardapio && formatarDinheiro(valor_total_item_cardapio)}</strong>
                </div>
            </div>

            <div style={{height: '100px'}} />
        </>
    )
}

export default DetalheItemCardapio
