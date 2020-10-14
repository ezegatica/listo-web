

export const subirImagen = (user, url) => {
    return (dispatch, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        return firestore.collection('usuarios').doc(user).set({
            foto: url,
        }).then(() => {
            return firestore.collection('restaurantes').doc(user).set({
                foto: url
            }).then(()=> {
                dispatch({type: 'IMAGEN_SUCCESS'})
            }).catch((err)=> {
                dispatch({type: 'IMAGEN_ERROR', err})
            })
        }).catch((err)=> {
            dispatch({type: 'IMAGEN_ERROR', err})
        })
    }
}

export const PreventCartToUpdateTRUE = () => {
    return (dispatch, {getFirebase, getFirestore}) => {
        dispatch({type: 'PREVENT_TRUE'})
    }
}
export const PreventCartToUpdateFALSE = () => {
    return (dispatch, {getFirebase, getFirestore}) => {
        dispatch({type: 'PREVENT_FALSE'})
    }
}
export const DisableQuantityTrue = () => {
    return (dispatch, {getFirebase, getFirestore}) => {
        dispatch({type: 'DISABLE_QUANTITY'})
    }
}
export const DisableQuantityFalse = () => {
    return (dispatch, {getFirebase, getFirestore}) => {
        dispatch({type: 'ENABLE_QUANTITY'})
    }
}