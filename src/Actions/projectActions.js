
export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorUUID = getState().firebase.auth.uid;
        firestore.collection('proyectos').add({
            ...project,
            autorNombre: profile.nombre,
            autorApellido: profile.apellido,
            autorUUID: autorUUID,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'CREATE_PROJECT_ERROR', err})
        })
        
    }
};
