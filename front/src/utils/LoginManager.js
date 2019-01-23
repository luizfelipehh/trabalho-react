let AUTENTICADO = false;

if (localStorage.getItem('token')) {
    AUTENTICADO = true
}

export const isAutenticado = () => {
    return AUTENTICADO;
}

export const setAutenticado = (aut) => {
    
    if (aut === false) {
        localStorage.clear();
    }
    
    AUTENTICADO = aut;
}