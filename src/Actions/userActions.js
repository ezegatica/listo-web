

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

export const Prueba = () => {
    console.log("ANDA!");
}