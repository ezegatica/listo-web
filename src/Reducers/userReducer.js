const initState = {
    mensaje: null,
    cargando: false,
    done: false
}
const userReducer = (state = initState, action, props) => {
    switch (action.type) {
        case 'RESET':
            return {
                ...state,
                done: false
            }
        case 'IMAGEN_SUCCESS':
            console.log("SUBIDO!")
            return {
                ...state
            }

        case 'IMAGEN_ERROR':
            console.log(action.err)
            return { ...state }

        default:
            return state;
    }
}

export default userReducer