
export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorUUID = getState().firebase.auth.uid;
        firestore.collection('proyectos').add({
            ...project,
            autorNombre: profile.nombre,
            autorUUID: autorUUID,
            createdAt: new Date(),
            autorAdmin: profile.isAdmin
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'CREATE_PROJECT_ERROR', err})
        })
        
    }
};


export const crearProducto = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        if (project.titulo !== "" && project.descripcion !== "" && project.precio !== ""){
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorUUID = getState().firebase.auth.uid;
        firestore.collection('usuarios').doc(autorUUID).collection('productos').add({
            ...project,
            autorNombre: profile.nombre,
            autorUUID: autorUUID,
            // createdAt: new Date(),
            autorAdmin: profile.isAdmin
        }).then(() => {
            dispatch({type: 'PRODUCTO_SUCCESS', project})
        }).catch((err) =>{
            dispatch({type:'PRODUCTO_ERROR', err})
        })
    }else{
        dispatch({type:'PRODUCTO_VACIO'})
        console.log("PRODUCTO VACIO, CREACION INVALIDA")
    }
    }
};

// export const caca = (project) =>{
//     return(dispatch, getState, {getFirebase, getFirestore}) =>{
//         const firestore = getFirestore();
//         const autorUUID = getState().firebase.auth.uid;
//         firestore.collection('usuarios').doc(autorUUID).collection('productos').add({
//             titulo: project.title,
//             contenido: project.content
//         }).then(() => {
//             dispatch({type:'SUBPROYECTO_SUCCESS'})
//         }).catch((err) =>{
//             dispatch({type:'SUBPROYECTO_ERROR'})
//         })
//     }
// }

export const editProject = (project) =>{
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        // console.log("dispatched: ", project)
        // console.log("titulo nuevo: ", project.title)
        // console.log("contenido nuevo: ", project.content)
        // console.log("id proyecto a editar: ", project.id)
        firestore.collection('proyectos').doc(project.id).update({
            title: project.title,
            content: project.content
        }).then(() => {
            dispatch({type:'EDIT_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'EDIT_PROJECT_ERROR', err})
        })
    }
}