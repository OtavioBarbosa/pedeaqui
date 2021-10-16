export const MESA = "mesa_pedeaqui"
export const PEDIDO = "pedido_pedeaqui"

export const getMesa = () => JSON.parse(localStorage.getItem(MESA))

export const getPedido = () => parseInt(localStorage.getItem(PEDIDO))
