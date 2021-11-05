export const MESA = "mesa_pedeaqui"
export const PEDIDO = "pedido_pedeaqui"
export const CARRINHO = "carrinho_pedeaqui"

export const getMesa = () => localStorage.getItem(MESA) ? JSON.parse(localStorage.getItem(MESA)) : null

export const getPedido = () => localStorage.getItem(PEDIDO) ? parseInt(localStorage.getItem(PEDIDO)) : null

export const setCarrinho = (conteudo) => localStorage.setItem(CARRINHO, conteudo)

export const getCarrinho = () => localStorage.getItem(CARRINHO) ? JSON.parse(localStorage.getItem(CARRINHO)) : []
