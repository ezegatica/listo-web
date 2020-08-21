
// export const createProject = (project) =>{
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const autorUUID = getState().firebase.auth.uid;
//         firestore.collection('proyectos').add({
//             ...project,
//             autorNombre: profile.nombre,
//             autorUUID: autorUUID,
//             createdAt: new Date(),
//             autorAdmin: profile.isAdmin
//         }).then(() => {
//             dispatch({type: 'CREATE_PROJECT', project})
//         }).catch((err) =>{
//             dispatch({type:'CREATE_PROJECT_ERROR', err})
//         })
        
//     }
// };

export const borrarProducto = (producto) => {
    return(dispatch, getState, {getFirestore})=> {
        console.log("recibido en el actions")
        const firestore = getFirestore();
        firestore.collection('restaurantes').doc(producto.producto.autorUUID).collection('productos').doc(producto.id).delete()
        .then(() => {
            dispatch({type: 'PRODUCTO_ELIMINADO', producto})
            setTimeout(() => {
            
                dispatch({type: 'RESET'})
              }, 500)
            console.log("PRODUCTO: ", producto)
        }).catch((err) => {
            dispatch({type: 'PRODUCTO_ELIMINADO_ERROR', err})
        })
    }
}

export const crearProductoTMP = (project) => {
    return(dispatch, getState, {getFirestore})=> {
        setTimeout(() => {
            
            dispatch({type: 'PRODUCTO_SUCCESS', project})

            setTimeout(() => {
            
                dispatch({type: 'RESET'})
              }, 1000)

          }, 1000)

        console.log("recibido en el actions de prueba")
    }
}


export const crearProducto = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        if (project.titulo !== "" && project.descripcion !== "" && project.precio !== ""){
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorUUID = getState().firebase.auth.uid;
        firestore.collection('restaurantes').doc(autorUUID).collection('productos').add({
            ...project,
            autorNombre: profile.nombre,
            autorUUID: autorUUID,
        }).then(() => {
            dispatch({type: 'PRODUCTO_SUCCESS', project})
            setTimeout(() => {
                dispatch({type: 'RESET'})
              }, 500)
        }).catch((err) =>{
            dispatch({type:'PRODUCTO_ERROR', err})
        })
    }else{
        dispatch({type:'PRODUCTO_VACIO'})
        console.log("PRODUCTO VACIO, CREACION INVALIDA")
    }
    }
};
export const editarProducto = (producto) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        if (producto.titulo !== "" && producto.descripcion !== "" && producto.precio !== ""){
            console.log("EDITAR PRODUCTO:", producto)
            const firestore = getFirestore();
            // const uid = getState().firebase.auth.uid;
            firestore.collection('restaurantes').doc(producto.producto.autorUUID).collection('productos').doc(producto.id).update({
                ...producto
            }).then(() => {
                dispatch({type: 'PRODUCTO_EDIT_SUCCESS', producto})
                setTimeout(() => {
            
                    dispatch({type: 'RESET'})
                  }, 500)
            }).catch((err) =>{
                dispatch({type:'PRODUCTO_EDIT_ERROR', err})
            })
        }else{
            dispatch({type:'PRODUCTO_VACIO'})
            console.log("PRODUCTO VACIO, CREACION INVALIDA")
        }
    }
}

// export const editProject = (project) =>{
//     return(dispatch, getState, {getFirebase, getFirestore}) =>{
//         const firestore = getFirestore();
//         firestore.collection('proyectos').doc(project.id).update({
//             title: project.title,
//             content: project.content
//         }).then(() => {
//             dispatch({type:'EDIT_PROJECT', project})
//         }).catch((err) =>{
//             dispatch({type:'EDIT_PROJECT_ERROR', err})
//         })
//     }
// }