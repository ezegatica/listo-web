const initState = {
    mensaje: null,
    cargando: false,
    done: false,
    prev: false,
    disq: false
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
        case 'PREVENT_TRUE':
            console.log("PREVINIENDO");
            return{...state,
            prev: true}
        case 'PREVENT_FALSE':
            console.log("PREVINIENDO");
            return{...state,
            prev: false}
        case 'DISABLE_QUANTITY':
        return{...state,
            disq: true}
        case 'ENABLE_QUANTITY':
        return{...state,
            disq: false}
        default:
            return state;
    }
}

export default userReducer