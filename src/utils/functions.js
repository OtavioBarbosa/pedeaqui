const campoInvalido = (id) => {
    if(!document.getElementById(id).classList.contains('campo-obrigatorio')){
        document.getElementById(id).classList.add('campo-obrigatorio')
    } 
}

const campoValido = (id) => {
    if(document.getElementById(id).classList.contains('campo-obrigatorio')){
        document.getElementById(id).classList.remove('campo-obrigatorio')
    } 
}

const validarEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

export {
    campoInvalido,
    campoValido,
    validarEmail
}