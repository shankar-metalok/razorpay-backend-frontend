export const Addedfun = (val) =>{
    return {
        type : 'added',
        payload : val
    }
}

export const Delfun = (delval) =>{
    return {
        type : 'del',
        payload : delval
    }
}